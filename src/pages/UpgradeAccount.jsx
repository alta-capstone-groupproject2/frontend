import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'
import CurrencyFormat from 'react-currency-format'
import Loading from '../components/Loading'
import { apiRequest } from '../utils/apiRequest'
import Swal from 'sweetalert2'
import Sidebar from '../components/Sidebar'

function UpgradeAccount() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [doc, setDoc] = useState("")
    const [store,setStore] = useState("")
    const [owner,setOwner] = useState("")
    const [phone,setPhone] = useState("")
    const [city,setCity] = useState("")
    const [address,setAddress] = useState("")
    const [isStoreError, setIsStoreError] = useState(false)
    const [isOwnerError, setIsOwnerError] = useState(false)
    const [isCityError, setIsCityError] = useState(false)
    const [isPhoneError, setIsPhoneError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const apiPostStore = () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("document",doc)
        formData.append("storeName",store)
        formData.append("owner",owner)
        formData.append("phone",`62${phone}`)
        formData.append("city",city)
        formData.append("address",address)

        apiRequest("users/stores", "post", formData, {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        })
        .then((res) => {
            const { code,message } = res;
            
        switch (code) {
            case '200':
                Swal.fire(`Success`, message, 'success')
                .then(() => {
                    navigate('/dashboard')
                });
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
        'doc': (target) => checkFile(
            target,
            5050000,
            ["application/pdf"],
            {
                size: 'file input must below 5.05 Mb',
                format: 'format file must pdf'
            },
            setDoc
        ),
        'store': (target) => setStore(target.value),
        'city': (target) => setCity(target.value),
        'owner': (target) => setOwner(target.value),
        'phone': (target) => setPhone(target.value),
        'address': (target)=>setAddress(target.value),
      }
      obj[type](val)
    }

    const handleSubmit = () => {
        const regText = /^[A-Za-z ]+$/;
        let passed = 0
        doc !== "" && passed++
        if (owner !== "" && regText.test(owner)) {
            passed++
            const tempText = owner
            setOwner(tempText.trim())
        } else {
            setIsOwnerError(true)
        }
        if (store !== "" && regText.test(store)) {
            passed++
            const tempText = store
            setStore(tempText.trim())
        } else {
            setIsStoreError(true)
        }
        if (city !== "" && regText.test(city)) {
            passed++
            const tempText = city
            setCity(tempText.trim())
        } else {
            setIsCityError(true)
        }
        phone !== "" && phone.length >= 10 ? passed++ : setIsPhoneError(true)
        address !== "" && passed++

        passed === 6 ? apiPostStore() : Swal.fire('Important', 'all field must be filled', 'error')
    }

    if (!isLoggedIn) {
        navigate('/login')
    } else {
        if (loading) {
            return <Loading />
        } else {
            return (
                <Layout>
                    <div className='w-full flex flex-col sm:flex-row mt-12 min-h-[80vh]'>
                        <Sidebar active={"umkm"}/>
                        <div className="basis-5/6">
                            <p className='font-bold text-lg'>Upgrade Account</p>
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
                                        Store
                                    </label>
                                    <div className="basis-5/6">
                                        <input id='input-name' type={"text"} value={store} onChange={(e) => handleChange(e, "store")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Name"></input>
                                        {isStoreError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>}
                                    </div>
                                </div>
                                <div className="flex flex-row my-2 items-center">
                                    <label className="basis-1/6">
                                        Owner
                                    </label>
                                    <div className="basis-5/6">
                                        <input id='input-name' type={"text"} value={owner} onChange={(e) => handleChange(e, "owner")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Name"></input>
                                        {isOwnerError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>}
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
                                        City
                                    </label>
                                    <div className="basis-5/6">
                                        <input id='input-name' type={"text"} value={city} onChange={(e) => handleChange(e, "city")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Name"></input>
                                        {isCityError && <span className='text-xs text-red-600'>Field must be filled and only alphabetic characters</span>}
                                    </div>
                                </div>
                                <div className="flex flex-row my-2 items-center">
                                    <label className="basis-1/6 self-start">
                                        Address
                                    </label>
                                    <div className="basis-5/6">
                                        <input id='input-detail' type={"text"} value={address} onChange={(e) => handleChange(e, "address")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Detail" />
                                    </div>
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
}

export default UpgradeAccount