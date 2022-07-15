import React,{useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { MdSpaceDashboard,MdOutlineEventAvailable } from 'react-icons/md'
import { TbTicket } from 'react-icons/tb'
import CurrencyFormat from 'react-currency-format'
import { IoStorefront } from 'react-icons/io5'
import { TokenContext } from '../../utils/Context'
import Map from '../../components/Map'
import SearchControl from '../../components/SearchMap'
import { apiRequest } from '../../utils/apiRequest'
import Swal from 'sweetalert2'

function Applyevent() {
    const {token} = useContext(TokenContext)
    const [doc, setDoc] = useState("")
    const [photo, setPhoto] = useState("")
    const [name,setName] = useState("")
    const [host,setHost] = useState("")
    const [phone,setPhone] = useState("")
    const [date,setDate] = useState("")
    const [price,setPrice] = useState("")
    const [detail,setDetail] = useState("")
    const [city,setCity] = useState("")
    const [position, setPosition] = useState(['',''])
    const [loading, setLoading] = useState(false)
    
    const apiPostEvent = () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("document",doc)
        formData.append("image",photo)
        formData.append("name",name)
        formData.append("hostedBy",host)
        formData.append("phone",phone)
        formData.append("date",date)
        formData.append("price",price)
        formData.append("details",detail)
        formData.append("city",city)
        formData.append("location",position.join())

        apiRequest("events", "post", formData, {
            'Content-Type': 'multipart/form-data'
        })
        .then((result) => {
              
        })
        .catch((err) => {
            const errorMsg = err.message
            const { message } = err.response.data  
            Swal.fire(errorMsg,message,'error'); 
        })
        .finally(()=>setLoading(false))
    }

    const handleChange = (e, type) => {
      const val = e.target
      const obj = {
        'doc': (target) => {
            if (target.files[0]) {
                const file = target.files[0]
                let passed = 0
                if (file.size > 5050000) {
                    Swal.fire('File to large', 'file input must below 5.05 Mb', 'error')
                    target.value=null
                } else { passed++ }
                if (file.type !== "application/pdf") {
                    Swal.fire('Wrong input', 'format file must pdf', 'error')
                    target.value=null
                } else { passed++ }
                passed === 2 && setDoc(file)
            }
        },
        'photo': (target) => {
            if (target.files[0]) {
                const file = target.files[0]
                let passed = 0
                if (file.size > 1050000) {
                    Swal.fire('File to large', 'file input must below 1.05 Mb', 'error')
                    target.value=null
                } else { passed++ }
                if (!['image/jpg','image/jpeg','image/png'].includes(file.type)) {
                    Swal.fire('Wrong input', 'format file must jpg,jpeg,png', 'error')
                    target.value=null
                } else { passed++ }
                passed === 2 && setPhoto(file)
            }  
        },
        'name': (target)=>setName(target.value),
        'host': (target)=>setHost(target.value),
        'phone': (target) => {setPhone(target.value)},
        'date': (target)=>setDate(target.value),
        'price': (target)=>setPrice(target.value),
        'detail': (target)=>setDetail(target.value),
        'city': (target)=>setCity(target.value)
      }
      obj[type](val)
    }

    const handleSubmit = () => {
        let passed = 0
        doc !== "" && passed++
        photo !== "" && passed++
        name !== "" && passed++
        host !== "" && passed++
        phone !== "" && passed++
        date !== "" && passed++
        price !== "" && passed++
        detail !== "" && passed++
        city !== "" && passed++
        position.join() !== ',' && passed++

        passed === 10 ? alert('okay') : Swal.fire('Important', 'all field must be filled', 'error')
    }
    
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
                            </div>
                        </div>
                        <div className="flex flex-row my-2 items-center">
                            <label className="basis-1/6">
                                Host
                            </label>
                            <div className="basis-5/6">
                                <input id='input-host' type={"text"} value={host} onChange={(e) => handleChange(e, "host")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Host"></input>
                            </div>
                        </div>
                        <div className="flex flex-row my-2 items-center">
                            <label className="basis-1/6">
                                Phone
                            </label>
                            <div className="basis-5/6">
                                <CurrencyFormat id='input-phone' format="####-####-#### #" value={phone} onChange={(e) => handleChange(e, "phone")} className="border-[0.1rem] rounded p-2 w-full" placeholder="####-####-#### #"/>
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
                                <CurrencyFormat id='input-price' thousandSeparator="." decimalSeparator=',' prefix='Rp.' value={price} onChange={(e) => handleChange(e, "price")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Rp."/>
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
                            <button id='button-submit' className="font-bold py-2 px-20 bg-red-600 hover:bg-red-700 text-white rounded" onClick={()=>handleSubmit()}>Apply</button>
                        </div>
                    </div>
                </div>  
            </div>  
        </Layout>
    )
}

export default Applyevent