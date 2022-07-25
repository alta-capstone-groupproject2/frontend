/** @format */

import { Link } from 'react-router-dom';
import { FaStoreAlt } from 'react-icons/fa';
import { TbTicket } from 'react-icons/tb';
import { MdOutlineEventAvailable, MdSpaceDashboard } from 'react-icons/md';
import { IoLibrary,IoStorefront } from 'react-icons/io5';
import { RiListOrdered } from 'react-icons/ri';
import { apiRequest } from '../utils/apiRequest';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const SidebarAdmin = ({ active }) => {
	const classActive = 'flex items-center space-x-2 font-bold border-red-700 text-red-700 p-4 border-l-4'
	const classSide = 'flex items-center space-x-2 hover:bg-slate-100 text-slate-700 hover:border-red-700 border-l-white p-4 border-l-4'
	return (
		<div className='sm:w-1/4 mb-8 mt-4'>
			<div className='grid grid-cols-2 sm:grid-cols-1 px-8 sm:px-6 '>
				<Link to="/list-culture-admin" className={active === 'culture' ? classActive:classSide}><IoLibrary /> <span>Culture</span></Link>
				<Link to="/list-submission-event" className={active === 'eventSub' ? classActive:classSide}><MdOutlineEventAvailable /> <span>Event Submission</span></Link>
				<Link to="/list-submission-umkm" className={active === 'umkmSub' ? classActive:classSide}><IoStorefront /> <span>UMKM Submission</span></Link>
			</div>
		</div>
	)
}
const Sidebar = ({ active }) => {
	const [role,setRole] = useState('')
	const [status,setStatus] = useState('')
	const [loading, setLoading] = useState('')
	useEffect(() => {
		getProfile()
	},[])
	const getProfile = () => {
		setLoading(true)
		apiRequest('users', 'get', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				setRole(res.data.role);
				setStatus(res.data.status);
			})
			.catch((err) => {
				const errorMsg = err.message
				let msg
				if (err.response.data) msg = err.response.data.message 
				Swal.fire(`Failed Get Role User ${errorMsg}`,msg,'error'); 
			})
			.finally(() => setLoading(false));
	};
	return (
		<div className='sm:w-1/4 mb-8 '>
			<div className='grid grid-cols-2 sm:grid-cols-1 px-8 sm:px-6 '>
				<Link to='/dashboard'>
					<span
						className={
							active === 'dashboard'
								? 'flex items-center space-x-2 font-bold border-red-700 text-red-700 p-4 border-l-4'
								: 'flex items-center space-x-2 hover:bg-slate-100 text-slate-700 hover:border-red-700 border-l-white p-4 border-l-4'
						}>
						<MdSpaceDashboard />
						<p>Dashboard</p>
					</span>
				</Link>
				<Link to='/joined-event'>
					<span
						className={
							active === 'joined-event'
								? 'flex items-center space-x-2 font-bold border-red-700 text-red-700 p-4 border-l-4'
								: 'flex items-center space-x-2 hover:bg-slate-100 text-slate-700 hover:border-red-700 border-l-white p-4 border-l-4'
						}>
						<TbTicket />
						<p>Joined Event</p>
					</span>
				</Link>
				<Link to='/my-event'>
					<span
						className={
							active === 'my-event'
								? 'flex items-center space-x-2 font-bold border-red-700 text-red-700 p-4 border-l-4'
								: 'flex items-center space-x-2 hover:bg-slate-100 text-slate-700 hover:border-red-700 border-l-white p-4 border-l-4'
						}>
						<MdOutlineEventAvailable />
						<p>My Event</p>
					</span>
				</Link>
				{
					!loading && (
						role === "user" || status !== "approve" ? (
							<Link to='/upgrade-account'>
								<span
									className={
										active === 'umkm'
											? 'flex items-center space-x-2 font-bold border-red-700 text-red-700 p-4 border-l-4'
											: 'flex items-center space-x-2 hover:bg-slate-100 text-slate-700 hover:border-red-700 border-l-white p-4 border-l-4'
									}>
									<FaStoreAlt />
									<p>Upgrade Account</p>
								</span>
							</Link>
						) : (
							<Link to='/my-product'>
								<span
									className={
										active === 'umkm'
											? 'flex items-center space-x-2 font-bold border-red-700 text-red-700 p-4 border-l-4'
											: 'flex items-center space-x-2 hover:bg-slate-100 text-slate-700 hover:border-red-700 border-l-white p-4 border-l-4'
									}>
									<FaStoreAlt />
									<p>My Product</p>
								</span>
							</Link>
						)
					)
						
				}
				<Link to='/history-order'>
					<span
						className={
							active === 'history-order'
								? 'flex items-center space-x-2 font-bold border-red-700 text-red-700 p-4 border-l-4'
								: 'flex items-center space-x-2 hover:bg-slate-100 text-slate-700 hover:border-red-700 border-l-white p-4 border-l-4'
						}>
						<RiListOrdered />
						<p>History Order</p>
					</span>
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;