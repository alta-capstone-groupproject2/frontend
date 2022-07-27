/** @format */
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { apiRequest } from '../utils/apiRequest';
import Banner from '../components/Banner';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import CardEvent from '../components/Card/CardEvent';
import CardProduct from '../components/Card/CardProduct';
import { FaSearch } from 'react-icons/fa';
import merchanImg from '../assets/images/artem-beliaikin--r_ZJcwAz7A-unsplash.jpg'

const Homepage = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [event, setEvent] = useState([]);
	const [product, setProduct] = useState([]);
	const searchCultureName = searchParams.get('name');

	const getEvent = () => {
		apiRequest('events?page=1&limit=4', 'get')
			.then((res) => {
				setEvent(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getProduct = () => {
		apiRequest('products?page=1&limit=4', 'get')
			.then((res) => {
				setProduct(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		getEvent();
		getProduct();
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<Layout>
				<Banner />
				<div className='p-12 min-h-[70vh]'>
					<div className='space-y-6'>
						<div className='flex justify-between p-3'>
							<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Event</h1>
							<Link id='link-to-events' to='/events'>
								<p className='hover:text-red-700'>See All</p>
							</Link>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
							{event.map((item) => {
								return <CardEvent key={item.id} name={item.eventName} city={item.city} image={item.image} onClickEvent={() => navigate(`/event/${item.eventID}`)} />;
							})}
						</div>
					</div>
				</div>
				<div className='bg-red-700 flex max-h-[60vh] relative mt-10'>
					<div className='overflow-clip basis-1/2'>
						<div className='xl:bg-gradient-to-l xl:from-red-700 w-[20%] right-[50%] absolute xl:top-0 z-10 h-[50%] xl:h-full'></div>
						<img src={merchanImg} alt="" />
					</div>
					<div className='text-white p-12 space-y-4 cursor-default basis-1/2 flex justify-center flex-col'>
						<div>
							<h1 className='text-4xl font-extrabold pb-4'>Temukan ribuan product khas masing masing daerah diLamiapp </h1>
							<q className='font-thin text-lg'>Zaman boleh maju tapi budaya jangan ditinggalkan</q>
						</div>
					</div>
				</div>
				<div className='p-12 min-h-[70vh]'>
					<div className='space-y-6'>
						<div className='flex justify-between p-3'>
							<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Merchandise</h1>
							<Link id='link-to-merchandise' to='/merchandise'>
								<p className='hover:text-red-700'>See All</p>
							</Link>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
							{product.map((item, index) => {
								return <CardProduct key={index} name={item.productName} price={item.price} image={item.image} onClickProduct={() => navigate(`/merchandise/${item.productID}`)} />;
							})}
						</div>
					</div>
				</div>
				<div className='bg-red-700 mt-10 flex max-h-[60vh] relative justify-center'>
					<div className='text-white p-12 space-y-4 cursor-default basis-1/2 flex justify-center flex-col text-center'>
						<div>
							<h1 className='text-4xl font-extrabold pb-4'>Explore ribuan budaya kita yang tersedia diLamiApp.</h1>
							<q className='font-thin text-lg'>Kenal lebih dalam budaya kita</q>
						</div>
					</div>
				</div>
				<div className='pb-24'>
					<div className='flex items-center'>
						<div className='basis-1/2 relative'>
							<div className='xl:bg-gradient-to-l xl:from-white w-[20%] right-0 absolute xl:top-0 z-10 h-[50%] xl:h-full'></div>
							<img src='https://akcdn.detik.net.id/visual/2021/10/09/ngaben-skala-besar-di-bali-kembali-digelar-4_169.jpeg?w=650' alt='Ngaben' className='w-full' />
						</div>
						<div className='space-y-8 basis-1/2 flex flex-col pl-12'>
							<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default self-start'>Culture</h1>
							<h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-md text-red-700 font-bold'>Cari tahu lebih banyak mengenai budayamu disini</h1>
							<div className='flex'>
								<input type='text' id='search-culture-name' placeholder='Ngaben' onChange={(e) => setSearchParams({ name: e.target.value })} className='w-3/4 py-2 px-4 border focus:outline-none rounded-tl-md rounded-bl-md' />
								<button className='bg-red-700 p-4 text-white flex items-center justify-center cursor-pointer rounded-r' id='search-culture' onClick={() => navigate(`/cultures?name=${searchCultureName}`)}><FaSearch /></button>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
};

export default Homepage;
