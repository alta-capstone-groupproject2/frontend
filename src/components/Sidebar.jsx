/** @format */

import { Link } from 'react-router-dom';
import { MdSpaceDashboard, MdEventAvailable } from 'react-icons/md';
import { HiOutlineTicket } from 'react-icons/hi';
import { FaStoreAlt } from 'react-icons/fa';
import { RiListOrdered } from 'react-icons/ri';

const Sidebar = ({ active }) => {
	return (
		<div className='sm:w-1/4 mb-8'>
			<div className='grid grid-cols-3 gap-8 sm:gap-0 sm:grid-cols-1 justify-around py-2 sm:py-0 sm:space-y-4 px-6 text-red-700'>
				<Link to='/dashboard'>
					<span
						className={
							active === 'dashboard'
								? 'flex space-x-2 items-center font-bold border-red-700 pb-2 sm:pb-0 sm:pl-4 border-b-4 sm:border-b-0 sm:border-l-4'
								: 'flex space-x-2 items-center hover:font-bold hover:border-red-700 hover pb-2 sm:pb-0 sm:hover:pl-4 hover:border-b-4 sm:hover:border-b-0 sm:hover:border-l-4'
						}>
						<MdSpaceDashboard />
						<p>Dashboard</p>
					</span>
				</Link>
				<Link to='/joined-event'>
					<span
						className={
							active === 'joined event'
								? 'flex space-x-2 items-center font-bold border-red-700 pb-2 sm:pb-0 sm:pl-4 border-b-4 sm:border-b-0 sm:border-l-4'
								: 'flex space-x-2 items-center hover:font-bold hover:border-red-700 hover pb-2 sm:pb-0 sm:hover:pl-4 hover:border-b-4 sm:hover:border-b-0 sm:hover:border-l-4'
						}>
						<MdEventAvailable />
						<p>Joined Event</p>
					</span>
				</Link>
				<Link to='/my-event'>
					<span
						className={
							active === 'my event'
								? 'flex space-x-2 items-center font-bold border-red-700 pb-2 sm:pb-0 sm:pl-4 border-b-4 sm:border-b-0 sm:border-l-4'
								: 'flex space-x-2 items-center hover:font-bold hover:border-red-700 hover pb-2 sm:pb-0 sm:hover:pl-4 hover:border-b-4 sm:hover:border-b-0 sm:hover:border-l-4'
						}>
						<HiOutlineTicket />
						<p>My Event</p>
					</span>
				</Link>
				<Link to='/my-store'>
					<span
						className={
							active === 'my store'
								? 'flex space-x-2 items-center font-bold border-red-700 pb-2 sm:pb-0 sm:pl-4 border-b-4 sm:border-b-0 sm:border-l-4'
								: 'flex space-x-2 items-center hover:font-bold hover:border-red-700 hover pb-2 sm:pb-0 sm:hover:pl-4 hover:border-b-4 sm:hover:border-b-0 sm:hover:border-l-4'
						}>
						<FaStoreAlt />
						<p>My Store</p>
					</span>
				</Link>
				<Link to='/my-event'>
					<span
						className={
							active === 'history order'
								? 'flex space-x-2 items-center font-bold border-red-700 pb-2 sm:pb-0 sm:pl-4 border-b-4 sm:border-b-0 sm:border-l-4'
								: 'flex space-x-2 items-center hover:font-bold hover:border-red-700 hover pb-2 sm:pb-0 sm:hover:pl-4 hover:border-b-4 sm:hover:border-b-0 sm:hover:border-l-4'
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
