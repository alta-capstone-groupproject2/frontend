/** @format */
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='text-slate-400 border-t-2 border-slate-400 mx-8 mt-8'>
			<div className='flex justify-between items-center py-2'>
				<Link to='/'>
					<h1 className='font-bold text-base sm:text-md hover:text-slate-600'>&copy; LAMI APP</h1>
				</Link>
				<div className='flex items-center space-x-6 text-xs sm:text-sm'>
					<Link to='/about-us'>
						<h1 className='hover:text-slate-600'>About Us</h1>
					</Link>
					<Link to='/contact-us'>
						<h1 className='hover:text-slate-600'>Contact Us</h1>
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
