/** @format */
import { useContext,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi'
import { TokenContext } from '../utils/Context';
import { Button, Menu, MenuItem } from '@mui/material';
import logoSrc from '../assets/images/logo.webp'

const Navbar = () => {
	const navigate = useNavigate()
	const { token, setToken } = useContext(TokenContext);
	const menu = [
		{ name: 'Cultures', link: '/culture' },
		{ name: 'Event', link: '/event' },
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
        setToken("0");
        localStorage.removeItem("idUser");
        navigate('/login')
	}
	
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
					{token !== '0' ? (
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
									<div className='flex items-center'>
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
