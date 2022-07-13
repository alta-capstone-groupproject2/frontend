/** @format */

import Footer from './Footer';
import Navbar from './Header';

const Layout = ({ children }) => {
	return (
		<div className='w-full h-screen flex flex-col'>
			<Navbar />
			<div className='w-full h-full overflow-auto'>
				<div>{children}</div>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
