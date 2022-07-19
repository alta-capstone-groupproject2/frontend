/** @format */

import { Link } from 'react-router-dom';
import { FaStoreAlt } from 'react-icons/fa';
import { TbTicket } from 'react-icons/tb';
import { MdOutlineEventAvailable, MdSpaceDashboard } from 'react-icons/md';
import { RiListOrdered } from 'react-icons/ri';

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
							active === 'my-event'
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
							active === 'my-event'
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
