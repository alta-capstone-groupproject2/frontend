/** @format */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import Banner from '../components/Banner';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import CardEvent from '../components/CardEvent';

const Homepage = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [merchandise, setMerchandise] = useState([]);
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	const getEvent = () => {
		axios({
			method: 'GET',
			url: 'https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/events?page=1&limit=12&name=Wayang%20Kulit&city=Semarang',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				setEvents(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getMerchandise = () => {
		axios({
			method: 'GET',
			url: 'https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/products?limit=4&page=5&name=Batik%20Semarang&city=Semarang',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				setMerchandise(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		getEvent();
		getMerchandise();
	}, []);

	if (loading) {
		return <Loading />;
	} else {
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
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
						{events.map((item) => {
							return <CardEvent key={item.productID} img={item.image} name={item.eventName} city={item.city} onClickEvent={() => navigate(`event/${item.eventID}`)} />;
						})}
					</div>
				</div>
				<div className='p-12'>
					<div className='flex justify-between p-3'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Merchandise</h1>
						<Link to='/merchandise'>
							<p className='hover:text-red-700'>See All</p>
						</Link>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
						{merchandise.map((item) => {
							return <CardProduct key={item.eventID} img={item.image} name={item.productName} price={item.price} onClickMerchandise={() => navigate(`product/${item.productID}`)} />;
						})}
					</div>
				</div>
				<div className='p-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 cursor-default'>
					<div>
						<img src='https://akcdn.detik.net.id/visual/2021/10/09/ngaben-skala-besar-di-bali-kembali-digelar-4_169.jpeg?w=650' alt='ngaben' />
					</div>
					<div className='flex flex-col'>
						<h1 className='text-lg sm:text-xl font-bold'>Culture</h1>
						<div className='mt-12'>
							<h1 className='text-red-600 text-2xl sm:text-3xl  md:text-4xl font-bold'>Cari tahu lebih banyak mengenai budayamu disini</h1>
							<div className='flex mt-8'>
								<input type='text' id='search-culture' placeholder='Ngaben' className='border border-slate-300 py-2 px-4 w-3/4 focus:outline-none rounded-tl-md rounded-bl-md' onChange={(e) => setSearch(e.target.value)} />
								<div className='bg-red-700 px-4 flex items-center text-white cursor-pointer'>
									<FaSearch />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
};

export default Homepage;
