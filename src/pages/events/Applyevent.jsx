import React,{useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { MdSpaceDashboard,MdOutlineEventAvailable } from 'react-icons/md'
import { TbTicket } from 'react-icons/tb'
import { TiPlus } from 'react-icons/ti'
import { IoStorefront } from 'react-icons/io5'
import { TokenContext } from '../../utils/Context'
import Map from '../../components/Map'

function Applyevent() {
    const {token} = useContext(TokenContext)
    const [poster, setPoster] = useState("")
    const [srcPoster, setSrcPoster] = useState("")
    const [name,setName] = useState("")
    const [host,setHost] = useState("")
    const [performers,setPerformers] = useState("")
    const [date,setDate] = useState("")
    const [detail,setDetail] = useState("")
    const [location,setLocation] = useState("Malang")
    const [position, setPosition] = useState([-7.966620, 112.632629])
    const [loading, setLoading] = useState(false)
    
    const handleChange = (e, type) => {
      const val = e.target.value
      const obj = {
        'name': setName(val),
        'host':setHost(val),
        'performers':setPerformers(val),
        'date':setDate(val),
        'detail':setDetail(val),
        'location':setLocation(val)
      }
      obj[type](val)
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
                                {poster !== "" && (<img src={srcPoster} alt="image" className="w-48" />)}
                                <input type={"file"} onChange={(e) => handleChange(e, "poster")} ></input>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row my-2 items-center">
                        <label className="basis-1/6">
                            Photo Event
                        </label>
                        <div className="basis-5/6 ">
                            <div className="flex items-end border-[0.1rem] rounded p-2 w-full gap-2">
                                {poster !== "" && (<img src={srcPoster} alt="image" className="w-48" />)}
                                <input type={"file"} onChange={(e) => handleChange(e, "poster")} ></input>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row my-2 items-center">
                        <label className="basis-1/6">
                            Name
                        </label>
                        <div className="basis-5/6">
                            <input type={"text"} value={name} onChange={(e) => handleChange(e, "name")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Name"></input>
                        </div>
                    </div>
                    <div className="flex flex-row my-2 items-center">
                        <label className="basis-1/6">
                            Host
                        </label>
                        <div className="basis-5/6">
                            <input type={"text"} value={host} onChange={(e) => handleChange(e, "host")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Host"></input>
                        </div>
                    </div>
                    <div className="flex flex-row my-2 items-center">
                        <label className="basis-1/6">
                            Phone
                        </label>
                        <div className="basis-5/6">
                            <input type={"text"} value={performers} onChange={(e) => handleChange(e, "performers")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Performers"></input>
                        </div>
                    </div>
                    <div className="flex flex-row my-2 items-center">
                        <label className="basis-1/6">
                            Date
                        </label>
                        <div className="basis-5/6">
                            <input type="datetime-local" value={date} onChange={(e) => handleChange(e, "date")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Date"></input>
                        </div>
                    </div>
                    <div className="flex flex-row my-2 items-center">
                        <label className="basis-1/6">
                            Price
                        </label>
                        <div className="basis-5/6">
                            <textarea type={"text"} value={detail} onChange={(e) => handleChange(e, "detail")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Detail"></textarea>
                        </div>
                    </div>
                    <div className="flex flex-row my-2 items-center">
                        <label className="basis-1/6">
                            Detail
                        </label>
                        <div className="basis-5/6">
                            <textarea type={"text"} value={detail} onChange={(e) => handleChange(e, "detail")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Detail"></textarea>
                        </div>
                    </div>
                    <div className="flex flex-row my-2 items-center">
                        <label className="basis-1/6">
                            City
                        </label>
                        <div className="basis-5/6">
                            <input type={"text"} value={location} onChange={(e) => handleChange(e, "location")} className="border-[0.1rem] rounded p-2 w-full" placeholder="Location"></input>
                        </div>
                    </div>
                    <div className="flex flex-row my-2 items-center">
                        <Map position={position} setPosition={setPosition} />
                    </div>
                    <div className="flex flex-row my-2 items-center justify-end text-sm gap-2">
                        <b>Lat</b>{position[0]}<b>Lng.</b> {position[1]}
                    </div>
                    <div className="flex flex-row my-5 mb-10 items-center justify-end">
                        <button className="font-bold py-2 px-20 bg-red-600 hover:bg-red-700 text-white rounded">Apply</button>
                    </div>
                </div>
            </div>  
        </div>  
    </Layout>
  )
}

export default Applyevent