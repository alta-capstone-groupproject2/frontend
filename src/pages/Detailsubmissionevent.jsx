/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdOutlineEventAvailable } from 'react-icons/md'
import { IoStorefront,IoLibrary } from 'react-icons/io5'
import { apiRequest } from '../utils/apiRequest'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'
import Swal from 'sweetalert2'
import Layout from '../components/Layout'
import Loading from '../components/Loading'
import Map from '../components/Map'

function Detailsubmissionevent() {
    const [loading, setLoading] = useState(false)
    const [event,setEvent] = useState({})
    const token = localStorage.getItem('token')
    const idParams = useParams().id
    const position = '-7.9797,112.6304'.split(',')

    useEffect(() => {
        apiGetSubEvent()
    }, [])
    
    const apiGetSubEvent = async () => {
        setLoading(true)
        await apiRequest(`events/submission/${idParams}`, "get", false, {
            'Authorization': `Bearer ${token}`,
        })
          .then((result) => {
            const { code, message, data} = result
            console.log(result)
              switch (code) {
                case '200':
                setEvent(data)
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
            const { message } = err.response.data  
            Swal.fire(errorMsg,message,'error'); 
        })
        .finally(()=>setLoading(false))
    }

    const apiPutSubEvent = async (status) => {
        setLoading(true)
        await apiRequest(`events/submission/${idParams}`, `put`, {'status':status}, {
            'Authorization': `Bearer ${token}`,
        })
          .then((result) => {
            const { code, message} = result
            console.log(result)
              switch (code) {
                case '200':
                Swal.fire('Success',message,'error'); 
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
            const { message } = err.response.data  
            Swal.fire(errorMsg,message,'error'); 
        })
        .finally(()=>setLoading(false))
    }

    const handleStatus = (status) => {
        Swal.fire('Update', `Are you sure to ${status} this event`, 'question')
        .then((res) => { if (res.isConfirmed) {
            apiPutSubEvent(status)
        } })
    }

   if (loading) {
        return <Loading />
    } else {
        return (
            <Layout>
                <div className='min-h-[80vh] flex'>
                    <div className='basis-1/6 bg-slate-50 flex flex-col gap-6 p-6 text-sm'>
                        <Link to="" className='flex items-center gap-2 pl-3 hover:border-l-4 hover:border-red-600 hover:font-black hover:text-red-600'><IoLibrary />Culture</Link>
                        <Link to="" className='flex items-center gap-2 pl-3 border-l-4 border-red-600 font-black text-red-600'><MdOutlineEventAvailable />Event Submission</Link>
                        <Link to="" className='flex items-center gap-2 pl-3 hover:border-l-4 hover:border-red-600 hover:font-black hover:text-red-600'><IoStorefront />UMKM Submission</Link>
                    </div>
                    <div className='p-6 basis-5/6 flex'>
                        <div className='basis-2/3 flex flex-col gap-2'>
                            <p className='font-bold text-4xl flex justify-between items-center'>
                                {event.userName}
                                <span className='bg-red-600 rounded-full px-2 py-[0.1rem] text-white text-sm'>Event End</span>
                            </p>
                            <p className=' flex justify-between'>
                                <span className='font-bold text-4xl'>
                                    <CurrencyFormat className='font-bold' value={event.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp.'} />
                                </span>
                                <span>Verify : <a href={event.document} className='text-red-600 cursor-pointer font-bold underline' target='_blank' rel="noreferrer">Document1.pdf</a></span>
                            </p>
                            <p>contact :
                                <a href={`https://api.whatsapp.com/send?phone=${event.phone}`} className="underline text-red-600" target="_blank" rel="noreferrer">
                                    {event.phone}
                                </a>
                            </p>
                            <p className='font-bold text-2xl'>About this Event</p>
                            <p>{event.details}</p>
                            <Map position={position} />
                            <p className='text-right'><b>Lat</b>{event.location} <b>Lng.</b> {event.location}</p>
                            <div className='flex gap-4'>
                                <button className='shadow-md rounded py-2 px-10 font-bold bg-red-600 text-white' onClick={()=>handleStatus('approve')}> Accept </button>
                                <button className='shadow-md rounded py-2 px-10 font-bold text-red-600' onClick={()=>handleStatus('decline')}> Decline </button>
                            </div>
                        </div>
                        <div className='basis-1/3 p-8'>
                            <img src={"https://img.freepik.com/free-vector/music-event-poster-template-with-abstract-shapes_1361-1316.jpg?w=2000"} alt="" className='w-full mb-2' />
                            <p className='text-2xl flex justify-between font-bold'>
                                {event.name}
                                <span className='font-medium text-sm text-right'>
                                    {moment(event.date, 'DD-MM-YYYY').format('dddd')}, {moment(event.date).format('DD MMMM YYYY')}
                                </span>
                            </p>
                            <p><span className='text-slate-400'>Hosted By : </span> {event.hostedBy}</p>
                            <p><span className='text-slate-400'>City : </span> {event.city}</p>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Detailsubmissionevent