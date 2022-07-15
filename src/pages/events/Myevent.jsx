import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { MdSpaceDashboard,MdOutlineEventAvailable } from 'react-icons/md'
import { TbTicket } from 'react-icons/tb'
import { TiPlus } from 'react-icons/ti'
import { IoStorefront } from 'react-icons/io5'
import { Pagination } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../utils/apiRequest'
import Swal from 'sweetalert2'
import Loading from '../../components/Loading'
import CurrencyFormat from 'react-currency-format';

function Myevent() {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const [currTime,setCurrTime] = useState('')
    const [totalPg,setTotalPg] = useState('')
    const [myEvents,setMyEvents] = useState('')

    useEffect(() => {
        const res = {
            code: 200,
            message: "Success to get all event list",
            currentTime: "2022-07-05T09:04",
            totalPage: 20,
            data: [
                {
                    "eventID": 3,
                    "image": "https://i.pinimg.com/originals/71/ab/89/71ab891da616ad3016657941b2027e55.jpg",
                    "eventName": "Wayang Kulit",
                    "hostedBy": "host1",
                    "address": "St. Sukamaju, No.1, Kedali, Malang, Jawa Timur",
                    "details": "loremakjsdbakjshdaksjdhlaksjdhaljskdhalksjdhlaksjdhalkjdhalskjhdalksjdhlkahsdklajshdklajhsdlkajhsdlkajhsdlkjash",
                    "price": 21000,
                    "date": "2022-07-05T09:04",
                    "city": "Semarang"
                },
                {
                    "eventID": 4,
                    "image": "https://i.pinimg.com/564x/26/85/0e/26850e30f88277670589bfe48b70ea65.jpg",
                    "eventName": "Wayang Kulit",
                    "hostedBy": "host1",
                    "address": "St. Sukamaju, No.1, Kedali, Malang, Jawa Timur",
                    "details": "loremakjsdbakjshdaksjdhlaksjdhaljskdhalksjdhlaksjdhalkjdhalskjhdalksjdhlkahsdklajshdklajhsdlkajhsdlkajhsdlkjash",
                    "price": 21000,
                    "date": "2022-07-04T09:04",
                    "city": "Semarang"
                }
            ]
        }
        const { currentTime, data, totalPage } = res
        
        setCurrTime(currentTime)
        setTotalPg(totalPage)
        setMyEvents(data);
        setLoading(false)
    },[])

    const apiGetMyEvent = () => {
        setLoading(true)
        apiRequest("users/events", "get")
          .then((result) => {
              const { currentTime, data, totalPage } = result
              setCurrTime(currentTime)
              setTotalPg(totalPage)
              setMyEvents(data);
          })
        .catch((err) => {
            const errorMsg = err.message
            const { message } = err.response.data  
            Swal.fire(errorMsg,message,'error'); 
          })
          .finally(()=>setLoading(false))
    }

    const apiDeleteMyEvent = (id) => {
        setLoading(true)
        apiRequest(`events/${id}`, "delete")
          .then((result) => {
              const { code, message } = result
              switch (code) {
                case 204:                      
                Swal.fire('Success',message,'success'); 
                break
                case 400:                      
                Swal.fire('Failed',message,'error'); 
                break
                default:
                Swal.fire('Something Wrong',message,'info'); 
                break  
            }
        })
        .catch((err) => {
            const errorMsg = err.message
            const { message } = err.response.data  
            Swal.fire(errorMsg,message,'error'); 
        })
        .finally(()=>setLoading(false))
    }
    
    const handleDelete = (id) => {
        Swal.fire('Delete Event', 'Are you sure to delete this event', 'question')
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Deleted id : ', `${id}`, 'success')
                } 
            }); 
    }

    if (loading) {
        return <Loading />
    } else {
        return (
            <Layout>
                <Link to='/applyevent'>
                    <div className='bg-red-600 hover:bg-red-700 text-white shadow-md text-4xl p-3 fixed bottom-[9%] right-[3%] block whitespace-no-wrap cursor-pointer rounded-full'>
                        <TiPlus />
                    </div>
                </Link>
                <div className='min-h-[80vh] flex'>
                    <div className='basis-1/6 bg-slate-50 flex flex-col gap-6 p-6 text-sm'>
                        <Link to="" className='flex items-center gap-2 pl-3 hover:border-l-4 hover:border-red-600 hover:font-black hover:text-red-600'><MdSpaceDashboard />Dashboard</Link>
                        <Link to="" className='flex items-center gap-2 pl-3 hover:border-l-4 hover:border-red-600 hover:font-black hover:text-red-600'><TbTicket />Joined event</Link>
                        <Link to="" className='flex items-center gap-2 pl-3 border-l-4 border-red-600 font-black text-red-600'><MdOutlineEventAvailable />My Event</Link>
                        <Link to="" className='flex items-center gap-2 pl-3 hover:border-l-4 hover:border-red-600 hover:font-black hover:text-red-600'><IoStorefront />Upgrade Account</Link>
                        <Link to="" className='flex items-center gap-2 pl-3 hover:border-l-4 hover:border-red-600 hover:font-black hover:text-red-600'><MdSpaceDashboard />History Order</Link>
                    </div>
                    <div className='p-6 basis-5/6'>
                        <p className='font-bold text-lg'>My Event</p>
                        <div className='flex flex-col gap-4 p-4'>
                            {myEvents.map((event) => (
                                <div className='shadow rounded-lg overflow-hidden bg-white flex items-center' key={event.eventID}>
                                    <img src={event.image} alt="" className='w-48 cursor-pointer' id={`img-goto-detail-${event.eventID}`} />
                                    <div className='pl-8 py-4 break-all cursor-pointer' id={`div-goto-detail-${event.eventID}`} onClick={() => navigate(`event/detail/${event.eventID}`)}>
                                        <p className='font-bold text-4xl flex justify-between items-center'>
                                            {event.eventName}
                                            {event.date < currTime && <span className='bg-red-600 rounded-full px-2 py-[0.1rem] text-white text-sm'>Event End</span>}
                                        </p>
                                        <p className='flex justify-between'>
                                            <span>
                                                <span className='text-slate-400'>Hosted by:</span>{event.hostedBy}
                                            </span>
                                            <span className='flex gap-2 items-center'>
                                                <TbTicket />
                                                <CurrencyFormat className='font-bold' value={event.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp.'} />
                                            </span>
                                        </p>
                                        <p>
                                            {moment(event.date, 'DD-MM-YYYY').format('dddd')}, {moment(event.date).format('DD MMMM YYYY')}
                                        </p>
                                        <p>
                                            {event.address}
                                        </p>
                                        <p className='text-slate-400 mt-4'>
                                            About this event
                                        </p>
                                        <p className=''>
                                            {event.details.split('\n').map((item, key) => { return <span key={key}>{item}<br /></span> })}
                                        </p>
                                    </div>
                                    <div className='text-center px-14'>
                                        <button className='shadow-md rounded py-2 px-10 font-bold text-red-600' id={`del-event-${event.eventID}`} onClick={()=>handleDelete(event.eventID)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-center'>
                            <Pagination count={totalPg} onChange={(e, pg) => alert(pg)} shape="rounded" />
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Myevent