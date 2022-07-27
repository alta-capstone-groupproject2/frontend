/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';
import Loading from '../components/Loading';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import moment from 'moment';
import Swal from 'sweetalert2';
import { apiRequest } from '../utils/apiRequest';

function Joinedevent() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({})
    const [events, setEvents] = useState([])
    const [currTime, setCurrTime] = useState('')
    const [modal,setModal] = useState(false)
    const showTicket = () => setModal(true)
    const closeTicket = () => setModal(false)

    useEffect(() => {
        apiGetProfile()
    },[])

    const apiGetParticipations = () => {
        apiRequest('/events/participations', 'get', false, {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        })
        .then((result) => {
            const { code, message, data,currentTime } = result
            switch (code) {
                case '200':
                    setCurrTime(currentTime)
                    setEvents(data);
                    break
                case '400':
                    Swal.fire('Failed Get Event', message, 'error');
                    break
                default:
                    Swal.fire('Something Wrong Get Event', message, 'info');
                    break
            }
        })
        .catch((err) => {
            const errorMsg = err.message
            let msg
            if (err.response.data) msg = err.response.data.message 
            Swal.fire(`(Failed Get Event) ${errorMsg}`,msg,'error'); 
        })
        .finally(() => setLoading(false));
    }

    const apiGetProfile = () => {
        apiRequest('users', 'get', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((result) => {
				const { code, message, data } = result
                switch (code) {
                    case '200':
                        setProfile(data);
                        break
                    case '400':
                        Swal.fire('Failed Get Profile', message, 'error');
                        break
                    default:
                        Swal.fire('Something Wrong Get Profile', message, 'info');
                        break
                }
			})
			.catch((err) => {
				const errorMsg = err.message
                let msg
                if (err.response.data) msg = err.response.data.message 
                Swal.fire(`(Failed Get Profile) ${errorMsg}`,msg,'error'); 
			})
			.finally(() => apiGetParticipations());
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
                        <Sidebar active="joined-event" />
                        <div className=' basis-5/6'>
                            <p className='font-bold text-lg'>Joined Event</p>
                            <div className='flex flex-col gap-4 p-4'>
                                {
                                    events.length < 1 ? (
                                        <div className='p-20 text-slate-300 flex justify-center items-center text-4xl'>
                                            No Result
                                        </div>
                                    ) : (
                                        events.map((event) => (
                                            <div className='shadow rounded-lg overflow-hidden bg-white flex items-center' key={event.eventId}>
                                                <img src={event.image} alt="" className='w-48 cursor-pointer' id={`img-goto-detail-${event.eventId}`} />
                                                <div className='pl-8 py-4 break-all cursor-pointer flex-1' id={`div-goto-detail-${event.eventId}`} onClick={() => navigate(`/event/${event.eventId}`)}>
                                                    <p className='font-bold text-4xl flex justify-between items-center'>
                                                        {event.name}
                                                        {event.endDate < currTime && <span className='bg-red-600 rounded-full px-2 py-[0.1rem] text-white text-sm'>Event End</span>}
                                                    </p>
                                                    <p className='flex justify-between'>
                                                        <span>
                                                            <span className='text-slate-400'>Hosted by:</span>{event.hostedBy}
                                                        </span>
                                                        <span className='flex flex-col gap-2'>
                                                            <span className='rounded text-xs py-[0.1rem] text-center font-bold px-2 bg-red-600 text-white'>Status : {event.status}</span>
                                                        </span>
                                                    </p>
                                                    <div className=' flex justify-between'>
                                                        <div className='flex flex-col'>
                                                            <b>From</b>
                                                            <span className='ml-2'>{moment(event.startDate, 'DD-MM-YYYY').format('dddd')}, {moment.utc(event.startDate).format('DD MMMM YYYY, HH:mm')}</span>
                                                            <b>To</b>
                                                            <span className='ml-2'>{moment(event.endDate, 'DD-MM-YYYY').format('dddd')}, {moment.utc(event.endDate).format('DD MMMM YYYY, HH:mm')}</span>
                                                        </div>
                                                    </div>
                                                    <p>
                                                        {event.city}
                                                    </p>
                                                    <p className='text-slate-400 mt-4'>
                                                        About this event
                                                    </p>
                                                    <p className=''>
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas corporis, delectus id quaerat sapiente quam unde, autem ex commodi magnam voluptas eos consectetur alias recusandae. Facilis quas dolores odit laborum.
                                                    </p>
                                                </div>
                                                <div className='text-center px-14'>
                                                    <button className='shadow-md rounded py-2 px-10 font-bold text-red-600' id={`del-event-${''}`} onClick={showTicket}>Ticket</button>
                                                    <Modal
                                                        open={modal}
                                                        onClose={closeTicket}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    >
                                                        <div className='absolute rounded top-1/3 left-[48%] bg-white border-2 p-4 flex flex-col items-center'>
                                                            <img src={profile.image} alt='avatar' width={100} height={100} className='rounded-full' />
                                                            <p className='font-bold text-2xl'>{profile.name}</p>
                                                            <p className='text-lg'>ID : {profile.id}</p>
                                                            <p className='text-xs'>Lami App Ticket</p>
                                                            <button className='text-sm bg-red-600 text-white px-4 rounded'>Print Qr Code</button>
                                                        </div>
                                                    </Modal>
                                                </div>
                                            </div>
                                        )))
                                    }
                            </div>
                        </div>
                    </div>
                </Layout>
            )
        }
    }
}

export default Joinedevent