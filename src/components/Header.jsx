/** @format */
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi'
import { Button, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { reduxAction } from '../utils/redux/actions/action';
import logoSrc from '../assets/images/logo.webp'

export const NavbarAdmin = () => { 
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const clickDropdown = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const closeDropdown = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch(reduxAction("IS_LOGGED_IN", false));
		localStorage.removeItem("role");
		dispatch(reduxAction("ROLE", ''));
		navigate("/login");
	};
	return (
		<nav className='px-2 sm:px-12 py-5 flex items-center justify-between shadow-md z-20'>
			<div className='text-red-700 flex items-end gap-4 text-lg sm:text-2xl font-bold sm:flex'>
				<img src={logoSrc} alt="" className='h-10' /> admin
			</div>
			<div className='flex'>
				<div className='flex space-x-8 items-center mr-10 text-sm'>
					<div>
							<Button
								id="basic-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={clickDropdown}
							>
								<CgProfile className='text-3xl text-red-600 cursor-pointer' />
							</Button>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={closeDropdown}
								transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
							>
								<MenuItem onClick={()=>handleLogout()}>
									<div className='flex items-center'>
										<BiLogOut className='mr-2' /> <span>Log out</span>
									</div>
								</MenuItem>
							</Menu>
						</div>
				</div>
			</div>
		</nav>
	)
}


const Navbar = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
	const menu = [
		{ name: 'Cultures', link: '/cultures' },
		{ name: 'Event', link: '/events' },
		{ name: 'Merchandise', link: '/merchandise' },
	];

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const clickDropdown = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const closeDropdown = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch(reduxAction("IS_LOGGED_IN", false));
		localStorage.removeItem("role");
		dispatch(reduxAction("ROLE", ''));
		navigate("/login");
	};
	
	return (
		<nav className='px-2 sm:px-12 py-5 flex items-center justify-between shadow-md'>
			<Link id='link-to-index' to='/'>
				<div className='text-pink-700 text-lg sm:text-2xl font-bold sm:flex'>
					<img src={logoSrc} alt="" className='h-10' />
				</div>
			</Link>
			<div className='flex'>
				<div className='flex space-x-8 items-center mr-10 text-sm'>
					{menu.map((item, index) => {
						return (
							<span key={index}  className='py-1 text-stone-800 hover:text-red-600 font-semibold'>
								<Link id={`link-to-${item.name}`} to={item.link}>{item.name}</Link>
							</span>
						);
					})}
				</div>
				<div className='flex items-center space-x-4'>
					{isLoggedIn ? (
						<div>
							<Button
								id="basic-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={clickDropdown}
							>
								<CgProfile className='text-3xl text-red-600 cursor-pointer' />
							</Button>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={closeDropdown}
								transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
							>
								<MenuItem onClick={closeDropdown}>
									<div className='flex items-center' onClick={()=>navigate('/dashboard')}>
										<CgProfile className='mr-2' /> <span>Profile</span>
									</div>
								</MenuItem>
								<MenuItem onClick={()=>handleLogout()}>
									<div className='flex items-center'>
										<BiLogOut className='mr-2' /> <span>Log out</span>
									</div>
								</MenuItem>
							</Menu>
						</div>
					) : (
						<div className='flex text-pink-700 font-bold'>
							<Link id="l" to={'/login'}>
								<div>Login</div>
							</Link>
							<span className='px-2 select-none'>/</span>
							<Link to={'/signup'}>
								<div>Sign Up</div>
							</Link>
						</div>)
					}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
