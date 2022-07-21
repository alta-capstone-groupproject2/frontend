/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,useEffect} from 'react'
import { LayoutAdmin } from '../components/Layout'
import { SidebarAdmin } from '../components/Sidebar'
import Loading from '../components/Loading'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { apiRequest } from '../utils/apiRequest'

function Editcultures() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const navigate = useNavigate()
    const params = useParams()
    const [title,setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [reports,setReports] = useState([])
    const [srcPhoto,setSrcPhoto] = useState('')
    const [city,setCity] = useState('')
    const [detail,setDetail] = useState('')
    const [isTitleError,setIsTitleError] = useState(false)
    const [isCityError,setIsCityError] = useState(false)
    const [loading,setLoading] = useState(false)
    
    useEffect(() => {
        apiGetReport()
    },[])

    const apiGetReport = async () => {
        setLoading(true)
        const token = localStorage.getItem('token')
        await apiRequest(`cultures/reports/${params.id}`, "get", false, {
            'Authorization': `Bearer ${token}`,
        })
            .then((result) => {
                const { code, message, data } = result
                switch (code) {
                    case '200':
                        setReports(data)
                        break
                    case '400':
                        Swal.fire('Failed', message, 'error');
                        break
                    default:
                        Swal.fire('Something Wrong', message, 'info');
                        break
                }
            })
            .catch((err) => {
                const errorMsg = err.message
                let msg
                if (err.response.data) msg = err.response.data.message 
                Swal.fire(errorMsg,msg,'error'); 
            }).finally(()=>apiGetCulture())
    }

    const apiPutCulture = () => {
        setLoading(true)
        const formData = new FormData();
        const token = localStorage.getItem('token')
        formData.append("image",photo)
        formData.append("name",title)
        formData.append("details",detail)
        formData.append("city",city)

        apiRequest(`cultures/${params.id}`, "put", formData, {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        })
        .then((res) => {
            const { code,message } = res;
            
        switch (code) {
            case '200':
                Swal.fire(`Success`, message, 'success')
                .then(() => navigate('/list-culture-admin'));
                break;

            case '400': Swal.fire(`Failed`,message,'error'); break;
            default: Swal.fire(`Code ${code}`,message,'info'); break;
            }
        })
        .catch((err) => {
            const errorMsg = err.message
            let msg
            if (err.response.data) msg = err.response.data.message 
            Swal.fire(errorMsg,msg,'error'); 
        })
        .finally(()=>setLoading(false))
    }

    const apiGetCulture = async () => {
        setLoading(true)
        const token = localStorage.getItem('token')
        await apiRequest(`cultures/${params.id}`, "get", false, {
            'Authorization': `Bearer ${token}`,
        })
        .then((result) => {
            const { code, message, data } = result
            switch (code) {
                case '200':
                    setSrcPhoto(data.Image)
                    setTitle(data.name)                        
                    setCity(data.city)                        
                    setDetail(data.details)                        
                    break
                case '400':
                    Swal.fire('Failed', message, 'error');
                    break
                default:
                    Swal.fire('Something Wrong', message, 'info');
                    break
            }
        })
        .catch((err) => {
            const errorMsg = err.message
            let msg
            if (err.response.data) msg = err.response.data.message 
            Swal.fire(errorMsg,msg,'error'); 
        })
        .finally(()=>setLoading(false))
    }

    const checkFile = (target, size, reqTypes, message, callback) => {
        const file = target.files[0]
        if (file) {
            let passed = 0
            if (file.size > size) {
                Swal.fire('File to large', message.size , 'error')
                target.value=null
            } else { passed++ }
            if (!reqTypes.includes(file.type)) {
                Swal.fire('Wrong input', message.format , 'error')
                target.value=null
            } else { passed++ }
            passed === 2 && callback(file)  
        }
    }

    const handleChange = (e, type) => {
      const val = e.target
      const obj = {
        'photo': (target) => checkFile(
            target,
              1050000,
              ['image/jpg','image/jpeg','image/png'],
              {
                  size: 'file input must below 1.05 Mb',
                  format: 'format file must jpg,jpeg,png'
              },
              setPhoto
        ),
        'title': (target) => { setTitle(target.value)},
        'city': (target) => { setCity(target.value)},
        'detail': (target) => { setDetail(target.value)}
      }
      obj[type](val)
    }

    const handleSubmit = () => {
        const regText = /^[A-Za-z ]+$/;
        let passed = 0
        photo !== "" && passed++
        if (title !== "" && regText.test(title)) {
            passed++
            const tempName = title
            setTitle(tempName.trim())
        } else {
            setIsTitleError(true)
        }
        if (city !== "" && regText.test(city)) {
            passed++
            const tempName = city
            setCity(tempName.trim())
        } else {
            setIsCityError(true)
        }
        detail !== "" && passed++
        
        passed === 4 ? apiPutCulture() : Swal.fire('Important', 'all field must be filled', 'error')
    }

    if (!isLoggedIn) {
        navigate('/login')
    } else {
        if (loading) {
            return <Loading />
        } else {
            return (
                <LayoutAdmin>
                    <div className='min-h-[80vh] flex'>
                        <SidebarAdmin active={"culture"} />
                        <div className="p-6 basis-4/6">
                            <p className='font-bold text-lg'>Edit Culture</p>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6">
                                    Title
                                </label>
                                <div className="basis-5/6">
                                    <input id='input-title' type={"text"} value={title} onChange={(e) => handleChange(e, "title")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Title"></input>
                                    {isTitleError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>}
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6">
                                    Picture
                                </label>
                                <div className="basis-5/6 ">
                                    <div className="flex items-end border-[0.1rem] rounded p-2 w-full gap-2">
                                        {srcPhoto !== '' && (
                                            <a href={srcPhoto} target='_blank' rel="noreferrer">
                                                <img src={srcPhoto} alt='pict' className='w-48' />
                                            </a>)}
                                        <input id='input-photo' type={"file"} accept="image/jpg,image/jpeg,image/png" onChange={(e) => handleChange(e, "photo")} ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6">
                                    City
                                </label>
                                <div className="basis-5/6">
                                    <input id='input-city' type={"text"} value={city} onChange={(e) => handleChange(e, "city")} className="border-[0.1rem] rounded p-2 w-full" placeholder="City"></input>
                                    {isCityError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>}
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6 self-start">
                                    Detail
                                </label>
                                <div className="basis-5/6">
                                    <textarea id='input-detail' type={"text"} value={detail} onChange={(e) => handleChange(e, "detail")} className="border-[0.1rem] rounded p-2 w-full h-56" placeholder="Detail" />
                                </div>
                            </div>
                            <div className="flex flex-row my-5 mb-10 items-center justify-end">
                                <button id='button-submit' className="font-bold py-2 px-20 bg-red-600 hover:bg-red-700 text-white rounded" onClick={() => handleSubmit()}>Save</button>
                            </div>
                        </div>
                        <div className='p-6 basis-2/6'>
                            <p className='font-bold'>Reports</p>
                            <div className='p-2 space-y-2 '>
                                {reports.map((report,idx) => (
                                    <p key={idx}>{`- ${report.message}`}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </LayoutAdmin>
            )
        }
    }
}

export default Editcultures