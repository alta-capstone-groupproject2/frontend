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

const Homepage = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [event, setEvent] = useState([]);
	const [product, setProduct] = useState([]);
	const cultureName = searchParams.get('name');

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

	const searchCulture = () => {
		apiRequest(`cultures?page=1&limit=1&name=${cultureName}`, 'get')
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
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
				<div className='p-12'>
					<div className='space-y-6'>
						<div className='flex justify-between p-3'>
							<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Event</h1>
							<Link to='/events'>
								<p className='hover:text-red-700'>See All</p>
							</Link>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
							{event.map((item) => {
								return <CardEvent key={item.id} name={item.eventName} city={item.city} image={item.image} onClickEvent={() => navigate(`/event/${item.eventID}`)} />;
							})}
						</div>
					</div>
				</div>
				<div className='p-12'>
					<div className='space-y-6'>
						<div className='flex justify-between p-3'>
							<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Merchandise</h1>
							<Link to='/merchandise'>
								<p className='hover:text-red-700'>See All</p>
							</Link>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
							{product.map((item) => {
								return <CardProduct key={item.id} name={item.productName} price={item.price} image={item.image} onClickProduct={() => navigate(`/product/${item.productID}`)} />;
							})}
						</div>
					</div>
				</div>
				<div className='p-12'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<img src='https://akcdn.detik.net.id/visual/2021/10/09/ngaben-skala-besar-di-bali-kembali-digelar-4_169.jpeg?w=650' alt='Ngaben' />
						</div>
						<div className='space-y-8'>
							<h1 className='text-xl font-bold'>Culture</h1>
							<h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-md text-red-700 font-bold'>Cari tahu lebih banyak mengenai budayamu disini</h1>
							<div className='flex'>
								<input
									type='text'
									id='search-culture-name'
									placeholder='Ngaben'
									onChange={(e) => (cultureName === '' ? setSearchParams({}) : setSearchParams({ cultures: e.target.value }))}
									className='w-3/4 py-2 px-4 border focus:outline-none rounded-tl-md rounded-bl-md'
								/>
								<label htmlFor='search-culture' className='bg-red-700 p-4 text-white flex items-center justify-center'>
									<FaSearch />
								</label>
								<input type='submit' value='submit' id='search-culture' className='hidden' onClick={() => searchCulture()} />
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
};

export default Homepage;
