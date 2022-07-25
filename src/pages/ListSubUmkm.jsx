/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LayoutAdmin } from '../components/Layout'
import { SidebarAdmin } from '../components/Sidebar'
import moment from 'moment'
import { DataGrid, gridClasses  } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../utils/apiRequest'
import Swal from 'sweetalert2'
import Loading from '../components/Loading'

function ListSubUmkm() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const [subUmkm,setSubUmkm] = useState('')

    useEffect(() => {
        apiGetSubUmkm()
    }, [])
    
    const apiGetSubUmkm = async () => {
        setLoading(true)
        await apiRequest("stores/submissions?page=1&limit=100", "get", false, {
            'Authorization': `Bearer ${token}`,
        })
          .then((result) => {
            const { code, message, data} = result
            console.log(result)
              switch (code) {
                case '200':            
                setSubUmkm(data);
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

    const apiPutSubUmkm = async (id,stats) => {
        setLoading(true)
        const body = {
            "status": stats
        }
        await apiRequest(`stores/submissions/${id}`, "put", body, {
            'Authorization': `Bearer ${token}`,
        })
          .then((result) => {
            const { code, message} = result
            console.log(result)
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
        .finally(()=>apiGetSubUmkm())
    }

    const handleStats = (id,status) => {
        Swal.fire('Update', `Are you sure to ${status} this event`, 'question')
        .then((res) => { if (res.isConfirmed) {
            apiPutSubUmkm(id,status)
        } })
    }

    const columns = [
        { field: 'id', headerName:'Id',width:5},
        { field: 'name', headerName:'Username',width:140},
        { field: 'storeName', headerName:'Store Name',width:150},
        { field: 'owner', headerName:'Owner',width:150},
        { field: 'city', headerName:'City',width:150},
        {
            field: 'Date',
            headerName: 'Date',
            width: 90,
            valueFormatter: (params) => {
                return moment(params.value).format("D/M/YYYY");;
            }
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150,
            renderCell: (params) => {
                return (<a href={`https://api.WhatsApp.com/send?phone=${params.value}`} className="underline text-red-600" target='_blank' rel="noreferrer">{params.value}</a>);
            }
        },
        {
            field: 'document',
            headerName: 'Document',
            width: 150,
            renderCell: (params) => {
                const docUrl = params.value.split('/')
                const name = decodeURIComponent(docUrl[docUrl.length-1])
                return (<a href={`${params.value}`} target='_blank' className="break-all underline text-red-600" rel="noreferrer">{name}</a>);
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 90,
            renderCell: (params) => {
                const stats = params.value 
                switch (stats) {
                    case 'waiting':
                        return (<div className=' rounded-full px-2 text-amber-600 border-2 border-amber-600'>{params.value}</div>);
                    case 'approve':
                        return (<div className=' rounded-full px-2 text-green-600 border-2 border-green-600'>{params.value}</div>);
                    case 'decline':
                        return (<div className=' rounded-full px-2 text-red-600 border-2 border-red-600'>{params.value}</div>);
                    default:        
                        return (<div className='text-slate-400'>No Status</div>);
                }   
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            renderCell: (params) => {
                return (
                    <div className='flex flex-col gap-2 font-bold'>
                        <button className='bg-red-600 text-white py-[0.1rem] rounded px-2' onClick={()=>handleStats(params.row.id,'approve')}>Approve</button>
                        <button className='shadow text-red-600 py-[0.1rem] rounded px-2' onClick={()=>handleStats(params.row.id, 'decline')}>Decline</button>
                    </div>
                )
            }
        }
    ];

  if (!isLoggedIn) {
    navigate('/login')
  } else {
    if (loading) {
      return <Loading />
    } else {
      return (
        <LayoutAdmin>
          <div className='min-h-[80vh] flex'>
            <SidebarAdmin active="umkmSub" />
            <div className='p-6 basis-5/6'>
              <p className='font-bold text-lg mb-4'>Submission UMKM</p>
              <DataGrid
                    rows={subUmkm}
                    getRowHeight={() => 'auto'}
                    getEstimatedRowHeight={() => 200}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    sx={{
                        [`& .${gridClasses.cell}`]: {
                            py: 1,
                        },
                    }}
                />
            </div>
          </div>
        </LayoutAdmin>
      )
    }
  }
}

export default ListSubUmkm