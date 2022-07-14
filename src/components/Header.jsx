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
				<img src={logo} alt='Lami App' className='w-28 h-9' />
			</Link>
			<div className='flex'>
				<div className='flex space-x-4 items-center mr-8'>
					{menu.map((item, index) => {
						return (
							<span key={index} className='py-1 text-pink-700 hover:text-pink-900 font-semibold'>
								<Link to={item.link}>{item.name}</Link>
							</span>
						);
					})}
				</div>
				<div className='flex items-center space-x-4'>
					<div className='group inline-block hidden relative cursor-pointer text-center'>
						<button className='pl-5'>
							<CgProfile className='text-3xl text-sky-500 cursor-pointer' />
						</button>
						<ul className='absolute hidden text-gray-700 pt-1 group-hover:block -right-2/3 z-40'>
							<li className='text-white'>
								<Link to={'/profile'}>
									<div className='bg-sky-500 hover:bg-sky-700 py-2 px-4 block whitespace-no-wrap cursor-pointer rounded-t'>Profile</div>
								</Link>
							</li>
							<li className='text-white'>
								<div className='bg-sky-500 hover:bg-sky-700 py-2 px-4 block whitespace-no-wrap cursor-pointer rounded-b'>LogOut</div>
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
