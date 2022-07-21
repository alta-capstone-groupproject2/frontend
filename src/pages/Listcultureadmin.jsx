/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LayoutAdmin } from '../components/Layout'
import { SidebarAdmin } from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../utils/apiRequest'
import Swal from 'sweetalert2'
import Loading from '../components/Loading'
import { TiPlus } from 'react-icons/ti'
import { Link } from 'react-router-dom'

function Listcultureadmin() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [totalReport,setTotalReport] = useState([])
    const [loading, setLoading] = useState(true)
    const [cultures, setCultures] = useState(true)

    useEffect(() => {
        apiGetCultures()
    }, [])

    const apiGetCultures = async () => {
        setLoading(true)
        await apiRequest("cultures?limit=100&page=1", "get", false, {
            'Authorization': `Bearer ${token}`,
        })
            .then((result) => {
                const { code, message, data } = result
                data.map((culture)=>apiGetReport(culture.culture_id))
                switch (code) {
                    case '200':
                        setCultures(data);
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
                console.log(err)
                const errorMsg = err.message
                let msg
                if (err.response.data) msg = err.response.data.message 
                Swal.fire(errorMsg,msg,'error'); 
            })
            .finally(() => setLoading(false))
    }

    const apiGetReport = async (id) => {
        await apiRequest(`cultures/reports/${id}`, "get", false, {
            'Authorization': `Bearer ${token}`,
        })
            .then((result) => {
                const { code, message, data } = result
                switch (code) {
                    case '200':
                        const temp = totalReport
                        temp[id] = data.length
                        setTotalReport(temp)
                        console.log(temp[id])
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
    }

    const apiDeleteCulture = (id) => {
        setLoading(true)
        apiRequest(`cultures/${id}`, "delete", false, {
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
        .finally(()=>apiGetCultures())
    }

    const handleDelete = (id) => {
        Swal.fire('Delete Event', 'Are you sure to delete this event', 'question')
            .then((result) => {
                if (result.isConfirmed) {
                    apiDeleteCulture(id)
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
                <LayoutAdmin>
                    <Link to='/add-culture'>
                        <div className='bg-red-600 hover:bg-red-700 text-white shadow-md text-4xl p-3 fixed bottom-[9%] right-[3%] block whitespace-no-wrap cursor-pointer rounded-full'>
                            <TiPlus />
                        </div>
                    </Link>
                    <div className='min-h-[80vh] flex'>
                        <SidebarAdmin active="culture" />
                        <div className='p-6 basis-5/6'>
                            <p className='font-bold text-lg'>Culture</p>
                            <div className='flex flex-col gap-4 p-4'>
                                {cultures.map((culture) => (
                                    <div className='shadow rounded-lg overflow-hidden bg-white flex items-center' key={culture.culture_id}>
                                        <img src={culture.Image} alt="" className='w-48' />
                                        <div className='px-8 py-4 break-all flex-1'>
                                            <p className='font-bold text-4xl flex justify-between items-center w-full'>
                                                {culture.name}
                                                <span className='text-sm text-red-600'>
                                                   {totalReport[culture.culture_id] > 0 && `! ${totalReport[culture.culture_id]} Report`}
                                                </span>
                                            </p>
                                            <p>
                                                {culture.city}
                                            </p>
                                        </div>
                                        <div className='text-center px-14 flex flex-col gap-4'>
                                            <button className='shadow-md rounded py-2 px-10 font-bold bg-red-600 text-white' id={`edit-event-${culture.culture_id}`} onClick={() => navigate(`/edit-culture/${culture.culture_id}`)}>Edit</button>
                                            <button className='shadow-md rounded py-2 px-10 font-bold text-red-600' id={`del-event-${culture.culture_id}`} onClick={() => handleDelete(culture.culture_id)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </LayoutAdmin>
            )
        }
    }
}

export default Listcultureadmin