/** @format */

import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import logo from '../assets/images/logo.png';

const Navbar = () => {
	const menu = [
		{ name: 'Cultures', link: '/culture' },
		{ name: 'Event', link: '/event' },
		{ name: 'Merchandise', link: '/merchandise' },
	];

	return (
		<nav className='px-2 sm:px-12 py-5 flex items-center justify-between shadow-md'>
			<Link to='/'>
				<img src={logo} alt='Lami App' className='w-28 h-8' />
			</Link>
			<div className='flex items-center'>
				<div className='group inline-block relative cursor-pointer text-center'>
					<h1 className='font-bold text-red-700'>Explore</h1>
					<ul className='absolute hidden text-gray-700 pt-6 group-hover:block -right-2/3 z-40'>
						{menu.map((item, index) => {
							return (
								<li key={index} className='text-red-700 hover:text-red-900 font-semibold bg-white hover:bg-slate-300 bg-opacity-90 px-4 py-2 border-b border-slate-400'>
									<Link to={item.link}>{item.name}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className='flex items-center space-x-4'>
					<div className='group inline-block hidden relative cursor-pointer text-center'>
						<button className='pl-5'>
							<CgProfile className='text-3xl text-red-700 cursor-pointer' />
						</button>
						<ul className='absolute hidden text-gray-700 pt-5 group-hover:block -right-2/3 z-40 font-semibold'>
							<li className='text-red-700'>
								<Link to={'/profile'}>
									<div className='bg-white bg-opacity-90 hover:bg-slate-300 py-2 px-4 block whitespace-no-wrap cursor-pointer border-b border-slate-400'>Profile</div>
								</Link>
							</li>
							<li className='text-red-700'>
								<div className='bg-white bg-opacity-90 hover:bg-slate-300 py-2 px-4 block whitespace-no-wrap cursor-pointer'>LogOut</div>
							</li>
						</ul>
					</div>
					<div className='flex text-pink-700 font-bold'>
						<Link to={'/login'}>
							<div>Login</div>
						</Link>
						<span className='px-2 select-none'>/</span>
						<Link to={'/signup'}>
							<div>Sign Up</div>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
