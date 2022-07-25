/** @format */

import Footer from './Footer';
import Navbar,{NavbarAdmin} from './Header';

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
export const LayoutAdmin = ({ children }) => {
	return (
		<div className='w-full h-screen flex flex-col'>
			<NavbarAdmin />
			<div className='w-full h-full overflow-auto pt-8'>
				<div>{children}</div>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
