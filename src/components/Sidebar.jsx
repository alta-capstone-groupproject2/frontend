/** @format */

import { Link } from 'react-router-dom';
import { FaStoreAlt } from 'react-icons/fa';
import { TbTicket } from 'react-icons/tb';
import { MdOutlineEventAvailable, MdSpaceDashboard } from 'react-icons/md';
import { IoLibrary,IoStorefront } from 'react-icons/io5';
import { RiListOrdered } from 'react-icons/ri';

export const SidebarAdmin = ({ active }) => {
	const classActive = 'flex items-center gap-2 pl-3 border-l-4 border-red-600 font-black text-red-600'
	const classSide = 'flex items-center gap-2 pl-3 hover:border-l-4 hover:border-red-600 hover:font-black hover:text-red-600'
	return (
		<div className='basis-1/6 bg-slate-50 flex flex-col gap-6 p-6 text-sm '>
			<Link to="" className={active === 'culture' ? classActive:classSide}><IoLibrary />Culture</Link>
			<Link to="/list-submission-event" className={active === 'eventSub' ? classActive:classSide}><MdOutlineEventAvailable />Event Submission</Link>
			<Link to="" className={active === 'umkmSub' ? classActive:classSide}><IoStorefront />UMKM Submission</Link>
		</div>
	)
}
const Sidebar = ({ active }) => {
	return (
		<div className='sm:w-1/4 mb-8'>
			<div className='grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-4 px-8 sm:px-6'>
				<Link to='/dashboard'>
					<span
						className={
							active === 'dashboard'
								? 'flex items-center space-x-2 font-bold border-red-700 text-red-700 -ml-4 pl-4 border-l-4'
								: 'flex items-center space-x-2 hover:font-bold text-red-700 hover:border-red-700 hover:-ml-4 hover:pl-4 hover:border-l-4'
						}>
						<MdSpaceDashboard />
						<p>Dashboard</p>
					</span>
				</Link>
				<Link to='/joined-event'>
					<span
						className={
							active === 'joined-event'
								? 'flex items-center space-x-2 font-bold border-red-700 text-red-700 -ml-4 pl-4 border-l-4'
								: 'flex items-center space-x-2 hover:font-bold text-red-700 hover:border-red-700 hover:-ml-4 hover:pl-4 hover:border-l-4'
						}>
						<TbTicket />
						<p>Joined Event</p>
					</span>
				</Link>
				<Link to='/my-event'>
					<span
						className={
							active === 'my-event'
								? 'flex items-center space-x-2 font-bold border-red-700 text-red-700 -ml-4 pl-4 border-l-4'
								: 'flex items-center space-x-2 hover:font-bold text-red-700 hover:border-red-700 hover:-ml-4 hover:pl-4 hover:border-l-4'
						}>
						<MdOutlineEventAvailable />
						<p>My Event</p>
					</span>
				</Link>
				<Link to='/upgrade-account'>
					<span
						className={
							active === 'upgrade-account'
								? 'flex items-center space-x-2 font-bold border-red-700 text-red-700 -ml-4 pl-4 border-l-4'
								: 'flex items-center space-x-2 hover:font-bold text-red-700 hover:border-red-700 hover:-ml-4 hover:pl-4 hover:border-l-4'
						}>
						<FaStoreAlt />
						<p>Upgrade Account</p>
					</span>
				</Link>
				<Link to='/history-order'>
					<span
						className={
							active === 'history-order'
								? 'flex items-center space-x-2 font-bold border-red-700 text-red-700 -ml-4 pl-4 border-l-4'
								: 'flex items-center space-x-2 hover:font-bold text-red-700 hover:border-red-700 hover:-ml-4 hover:pl-4 hover:border-l-4'
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