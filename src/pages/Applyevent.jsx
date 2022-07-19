import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { MdSpaceDashboard,MdOutlineEventAvailable } from 'react-icons/md'
import { TbTicket } from 'react-icons/tb'
import CurrencyFormat from 'react-currency-format'
import { IoStorefront } from 'react-icons/io5'
import Map from '../components/Map'
import Loading from '../components/Loading'
import SearchControl from '../components/SearchMap'
import { apiRequest } from '../utils/apiRequest'
import Swal from 'sweetalert2'

function Applyevent() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [doc, setDoc] = useState("")
    const [photo, setPhoto] = useState("")
    const [name,setName] = useState("")
    const [host,setHost] = useState("")
    const [phone,setPhone] = useState("")
    const [date,setDate] = useState("")
    const [price,setPrice] = useState("")
    const [detail,setDetail] = useState("")
    const [city,setCity] = useState("")
    const [position, setPosition] = useState(['', ''])
    const [isNameError,setIsNameError] = useState(false)
    const [isHostError,setIsHostError] = useState(false)
    const [isPhoneError,setIsPhoneError] = useState(false)
    const [isCityError,setIsCityError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const apiPostEvent = () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("document",doc)
        formData.append("image",photo)
        formData.append("name",name)
        formData.append("hostedBy",host)
        formData.append("phone",`62${phone}`)
        formData.append("date",date)
        formData.append("price",price)
        formData.append("details",detail)
        formData.append("city",city)
        formData.append("location",position.join())

        apiRequest("events", "post", formData, {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        })
        .then((res) => {
            const { code,message } = res;
            
        switch (code) {
            case '200':
                Swal.fire(`Success`, message, 'success')
                .then(() => navigate('/myevent'));
                break;

            case '400': Swal.fire(`Failed`,message,'error'); break;
            
            default: Swal.fire(`Code ${code}`,message,'info'); break;
            }
        })
        .catch((err) => {
            const errorMsg = err.message
            const { message } = err.response.data  
            Swal.fire(errorMsg,message,'error'); 
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
                Swal.fire('Wrong input', message.Format , 'error')
                target.value=null
            } else { passed++ }
            passed === 2 && callback(file)  
        }
    }

    const handleChange = (e, type) => {
      const val = e.target
      const obj = {
          'doc': (target) => checkFile(
              target,
              5050000,
              ["application/pdf"],
              {
                  msgSize: 'file input must below 5.05 Mb',
                  msgFormat: 'format file must pdf'
              },
              setDoc
          ),
        'photo': (target) => checkFile(
            target,
              1050000,
              ['image/jpg','image/jpeg','image/png'],
              {
                  msgSize: 'file input must below 1.05 Mb',
                  msgFormat: 'format file must jpg,jpeg,png'
              },
              setPhoto
        ),
        'name': (target) => { setName(target.value); setIsNameError(false)},
        'host': (target) => { setHost(target.value);  setIsHostError(false)},
        'phone': (target) => { setPhone(target.value); setIsPhoneError(false)},
        'date': (target)=>setDate(target.value),
        'price': (target)=>setPrice(target.value.split('.').join("")),
        'detail': (target)=>setDetail(target.value),
        'city': (target) => { setCity(target.value); setIsCityError(false)}
      }
      obj[type](val)
    }

    const handleSubmit = () => {
        const regText = /^[A-Za-z ]+$/;
        let passed = 0
        doc !== "" && passed++
        photo !== "" && passed++
        if (name !== "" && regText.test(name)) {
            passed++
            const tempName = name
            setName(tempName.trim())
        } else {
            setIsNameError(true)
        }
        if (host !== "" && regText.test(host)) {
            passed++
            const tempName = host
            setHost(tempName.trim())
        } else {
            setIsHostError(true)
        }
        phone !== "" && phone.length >= 10 ? passed++ : setIsPhoneError(true)
        date !== "" && passed++
        price !== "" && passed++
        detail !== "" && passed++
        if (city !== "" && regText.test(city)) {
            passed++
            const tempName = city
            setCity(tempName.trim())
        } else {
            setIsCityError(true)
        }
        position.join() !== ',' && passed++

        passed === 10 ? apiPostEvent() : Swal.fire('Important', 'all field must be filled', 'error')
    }
    if (loading) {
        return <Loading />
    } else {
        return (
            <Layout>
                <div className='min-h-[80vh] flex'>
                    <div className='basis-1/6 bg-slate-50 flex flex-col gap-6 p-6 text-sm'>
                        <Link to="" className='flex items-center gap-2 pl-3 hover:border-l-4 hover:border-red-600 hover:font-black hover:text-red-600'><MdSpaceDashboard />Dashboard</Link>
                        <Link to="" className='flex items-center gap-2 pl-3 hover:border-l-4 hover:border-red-600 hover:font-black hover:text-red-600'><TbTicket />Joined event</Link>
                        <Link to="" className='flex items-center gap-2 pl-3 border-l-4 border-red-600 font-black text-red-600'><MdOutlineEventAvailable />My Event</Link>
                        <Link to="" className='flex items-center gap-2 pl-3 hover:border-l-4 hover:border-red-600 hover:font-black hover:text-red-600'><IoStorefront />Upgrade Account</Link>
                        <Link to="" className='flex items-center gap-2 pl-3 hover:border-l-4 hover:border-red-600 hover:font-black hover:text-red-600'><MdSpaceDashboard />History Order</Link>
                    </div>
                    <div className="p-6 basis-5/6">
                        <p className='font-bold text-lg'>Apply Event</p>
                        <div className="pr-20">
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6">
                                    Document
                                </label>
                                <div className="basis-5/6 ">
                                    <div className="flex items-end border-[0.1rem] rounded p-2 w-full gap-2">
                                        <input id="input-doc" type={"file"} accept="application/pdf" onChange={(e) => handleChange(e, "doc")} ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6">
                                    Photo Event
                                </label>
                                <div className="basis-5/6 ">
                                    <div className="flex items-end border-[0.1rem] rounded p-2 w-full gap-2">
                                        <input id='input-photo' type={"file"} accept="image/jpg,image/jpeg,image/png" onChange={(e) => handleChange(e, "photo")} ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6">
                                    Name
                                </label>
                                <div className="basis-5/6">
                                    <input id='input-name' type={"text"} value={name} onChange={(e) => handleChange(e, "name")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Name"></input>
                                    {isNameError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>}
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6">
                                    Host
                                </label>
                                <div className="basis-5/6">
                                    <input id='input-host' type={"text"} value={host} onChange={(e) => handleChange(e, "host")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Host"></input>
                                    {isHostError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>}
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6">
                                    Phone
                                </label>
                                <div className="basis-5/6">
                                    <div className="border-[0.1rem] flex rounded w-full">
                                        <div className='bg-slate-200 p-2'>+62</div>
                                        <CurrencyFormat id='input-phone' value={phone} onChange={(e) => handleChange(e, "phone")} className="p-2 w-full" maxLength={13} />
                                    </div>
                                    {isPhoneError && <span className='text-xs text-red-600'>Minimum phone number is 10</span>}
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6">
                                    Date
                                </label>
                                <div className="basis-5/6">
                                    <input id='input-date' type="datetime-local" value={date} onChange={(e) => handleChange(e, "date")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Date"></input>
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6">
                                    Price
                                </label>
                                <div className="basis-5/6">
                                    <div className="border-[0.1rem] flex rounded w-full">
                                        <div className='bg-slate-200 p-2'>Rp.</div>
                                        <CurrencyFormat id='input-price' thousandSeparator="." decimalSeparator=',' value={price} onChange={(e) => handleChange(e, "price")} className="p-2 w-full" placeholder="Rp." />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6 self-start">
                                    Detail
                                </label>
                                <div className="basis-5/6">
                                    <textarea id='input-detail' type={"text"} value={detail} onChange={(e) => handleChange(e, "detail")} className="border-[0.1rem] rounded p-2 w-full h-48" placeholder="Detail"></textarea>
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <label className="basis-1/6">
                                    City
                                </label>
                                <div className="basis-5/6">
                                    <input id='input-city' type="text" value={city} onChange={(e) => handleChange(e, "city")} className="border-[0.1rem] rounded p-2 w-full" placeholder="City" />
                                    {isCityError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>}
                                </div>
                            </div>
                            <div className="flex flex-row my-2 items-center">
                                <Map position={position}>
                                    <SearchControl setPosition={setPosition} />
                                </Map>
                            </div>
                            <div className="flex flex-row my-2 items-center justify-end text-sm gap-2">
                                <span><b>Lat</b>{position[0]} <b>Lng.</b> {position[1]}</span>
                            </div>
                            <div className="flex flex-row my-5 mb-10 items-center justify-end">
                                <button id='button-submit' className="font-bold py-2 px-20 bg-red-600 hover:bg-red-700 text-white rounded" onClick={() => handleSubmit()}>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Applyevent