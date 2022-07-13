/** @format */
import Banner from '../components/Banner';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Homepage = () => {
	return (
		<Layout>
			<Banner />
			<div className='p-12'>
				<div className='flex justify-between p-3'>
					<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Event</h1>
					<Link to='/event'>
						<p className='hover:text-red-700'>See All</p>
					</Link>
				</div>
			</div>
			<div className='p-12'>
				<div className='flex justify-between p-3'>
					<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Merchandise</h1>
					<Link to='/merchandise'>
						<p className='hover:text-red-700'>See All</p>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Homepage;
