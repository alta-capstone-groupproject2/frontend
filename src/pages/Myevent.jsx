/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import { TbTicket } from 'react-icons/tb'
import { TiPlus } from 'react-icons/ti'
import { Pagination } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../utils/apiRequest'
import Swal from 'sweetalert2'
import Loading from '../components/Loading'
import CurrencyFormat from 'react-currency-format';

function Myevent() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const [currTime,setCurrTime] = useState('')
    const [totalPg,setTotalPg] = useState('')
    const [myEvents,setMyEvents] = useState('')

    useEffect(() => {
        apiGetMyEvent()
    },[])

    const apiGetMyEvent = async () => {
        setLoading(true)
        await apiRequest("users/events?limit=10&page=1", "get", false, {
            'Authorization': `Bearer ${token}`,
        })
            .then((result) => {
                const { code, currentTime, message, data, totalPage } = result
              switch (code) {
                case '200':                       
                setCurrTime(currentTime)
                setTotalPg(totalPage)
                setMyEvents(data);
                break
                case '400':                      
                Swal.fire('Failed',message,'error'); 
                break
                default:
                Swal.fire('Something Wrong',message,'info'); 
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

    const apiDeleteMyEvent = (id) => {
        setLoading(true)
        apiRequest(`events/${id}`, "delete", false, {
            'Authorization': `Bearer ${token}`,
        })
          .then((result) => {
              const { code, message } = result
              console.log(result)
              switch (code) {
                case '204':                      
                Swal.fire('Success',message,'success'); 
                break
                case '400':                      
                Swal.fire('Failed',message,'error'); 
                break
                default:
                Swal.fire('Something Wrong',message,'info'); 
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
    
    const handleDelete = (id) => {
        Swal.fire('Delete Event', 'Are you sure to delete this event', 'question')
            .then((result) => {
                if (result.isConfirmed) {
                    apiDeleteMyEvent(id)
                } 
            }); 
    }

    if (!isLoggedIn) {
        navigate('/login')
    } else {
        if (loading) {
            return <Loading />
        } else {
            return (
                <Layout>
                    <Link to='/apply-event'>
                        <div className='bg-red-600 hover:bg-red-700 text-white shadow-md text-4xl p-3 fixed bottom-[9%] right-[3%] block whitespace-no-wrap cursor-pointer rounded-full'>
                            <TiPlus />
                        </div>
                    </Link>
                    <div className='min-h-[80vh] pt-5 flex'>
                        <Sidebar active="my-event"/>
                        <div className='p-6 basis-5/6'>
                            <p className='font-bold text-lg'>My Event</p>
                            <div className='flex flex-col gap-4 p-4'>
                                {myEvents.map((event) => (
                                    <div className='shadow rounded-lg overflow-hidden bg-white flex items-center' key={event.eventID}>
                                        <img src={event.image} alt="" className='w-48 cursor-pointer' id={`img-goto-detail-${event.eventID}`} />
                                        <div className='pl-8 py-4 break-all cursor-pointer flex-1' id={`div-goto-detail-${event.eventID}`} onClick={() => navigate(`/event/${event.eventID}`)}>
                                            <p className='font-bold text-4xl flex justify-between items-center'>
                                                {event.eventName}
                                                {event.endDate < currTime && <span className='bg-red-600 rounded-full px-2 py-[0.1rem] text-white text-sm'>Event End</span>}
                                            </p>
                                            <p className='flex justify-between'>
                                                <span>
                                                    <span className='text-slate-400'>Hosted by:</span>{event.hostedBy}
                                                </span>
                                                <span className='flex flex-col gap-2'>
                                                    <span className='rounded text-xs py-[0.1rem] text-center font-bold px-2 bg-red-600 text-white'>Status : {event.Status}</span>
                                                </span>
                                            </p>
                                            <p className=' flex justify-between'>
                                                <div className='flex flex-col'>
                                                    <b>From</b>
                                                    <span className='ml-2'>{moment(event.startDate, 'DD-MM-YYYY').format('dddd')}, {moment(event.startDate).format('DD MMMM YYYY')}</span>
                                                    <b>To</b>     
                                                    <span className='ml-2'>{moment(event.endDate, 'DD-MM-YYYY').format('dddd')}, {moment(event.endDate).format('DD MMMM YYYY')}</span>
                                                </div>
                                                <span className='flex gap-2 items-center'>
                                                    <TbTicket />
                                                    <CurrencyFormat className='font-bold' value={event.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp.'} />
                                                </span>
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
                                            <button className='shadow-md rounded py-2 px-10 font-bold text-red-600' id={`del-event-${event.eventID}`} onClick={() => handleDelete(event.eventID)}>Delete</button>
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
}

export default Myevent