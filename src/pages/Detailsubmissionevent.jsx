/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../utils/apiRequest'
import { SidebarAdmin } from '../components/Sidebar'
import { TbTicket } from 'react-icons/tb'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'
import Swal from 'sweetalert2'
import {LayoutAdmin} from '../components/Layout'
import Loading from '../components/Loading'
import Map from '../components/Map'

function Detailsubmissionevent() {
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState({})
    const [position,setPosition] = useState([])
    const [currTime,setCurrTime] = useState({})
    const token = localStorage.getItem('token')
    const idParams = useParams().id

    useEffect(() => {
        apiGetSubEvent()
    }, [])
    
    const apiGetSubEvent = async () => {
        setLoading(true)
        await apiRequest(`events/submissions/${idParams}`, "get", false, {
            'Authorization': `Bearer ${token}`,
        })
          .then((result) => {
            const { code, message,currenttime, data} = result
              switch (code) {
                case '200':
                setEvent(data)
                setPosition(data.location.split(','))      
                setCurrTime(currenttime)      
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

    const apiPutSubEvent = async (status) => {
        setLoading(true)
        await apiRequest(`events/submissions/${idParams}`, `put`, {'status':status}, {
            'Authorization': `Bearer ${token}`,
        })
          .then((result) => {
            const { code, message} = result
              switch (code) {
                case '200':
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

    const handleStatus = (status) => {
        Swal.fire('Update', `Are you sure to ${status} this event`, 'question')
        .then((res) => { if (res.isConfirmed) {
            apiPutSubEvent(status)
        } })
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
                        <SidebarAdmin active={'eventSub'} />
                        <div className='p-6 basis-5/6 flex'>
                            <div className='basis-2/3 flex flex-col gap-2'>
                                <p className='font-bold text-4xl flex justify-between items-center'>
                                    {event.eventName}
                                    {event.endDate < currTime && <span className='bg-red-600 rounded-full px-2 py-[0.1rem] text-white text-sm'>Event End</span>}
                                </p>
                                <p className=' flex justify-between'>
                                    <span className='font-bold text-4xl flex items-center gap-4'>
                                        <TbTicket /><CurrencyFormat className='font-bold' value={event.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp.'} />
                                    </span>
                                    <span>Verify : <a href={event.document} className='text-red-600 cursor-pointer font-bold underline' target='_blank' rel="noreferrer">Document1.pdf</a></span>
                                </p>
                                <p className='font-bold text-2xl flex justify-between items-center'>
                                    About this Event
                                    <span className='text-red-600 text-sm rounded border-2 border-red-600 px-2'>Status : { event.status}</span>
                                </p>
                                <p>{event.details}</p>
                                <Map position={position} />
                                <p className='text-right'><b>Lat</b>{position[0]} <b>Lng.</b> {position[1]}</p>
                                <div className='flex gap-4'>
                                    <button className='shadow-md rounded py-2 px-10 font-bold bg-red-600 text-white' onClick={() => handleStatus('approve')}> Accept </button>
                                    <button className='shadow-md rounded py-2 px-10 font-bold text-red-600' onClick={() => handleStatus('decline')}> Decline </button>
                                </div>
                            </div>
                            <div className='basis-1/3 p-8'>
                                <img src={event.image === '' ? "https://eproc.lkpp.go.id/v3/img/no-picture.jpg" : event.image} alt="" className='w-full mb-2' />
                                <p className='text-2xl font-bold'>
                                    <span className='font-medium text-sm'>
                                        <div className='flex flex-col'>
                                            <b>From</b>
                                            <span className='ml-2'>{moment(event.startDate, 'DD-MM-YYYY').format('dddd')}, {moment.utc(event.startDate).format('DD MMMM YYYY, HH:mm')}</span>
                                            <b>To</b>     
                                            <span className='ml-2'>{moment(event.endDate, 'DD-MM-YYYY').format('dddd')}, {moment.utc(event.endDate).format('DD MMMM YYYY, HH:mm')}</span>
                                        </div>
                                    </span>
                                </p>
                                <p><span className='text-slate-400'>Hosted By : </span> {event.hostedBy}</p>
                                <p><span className='text-slate-400'>City : </span> {event.city}</p>
                            </div>
                        </div>
                    </div>
                </LayoutAdmin>
            )
        }
    }
}

export default Detailsubmissionevent