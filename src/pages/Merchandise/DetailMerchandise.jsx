/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCartPlus, FaSearch, FaStar, FaStarHalf } from 'react-icons/fa';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';

const DetailMerchandise = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [searchMerchandise, setSearchMerchandise] = useSearchParams();
	const [searchCity, setSearchCity] = useSearchParams();
	const merchandise = searchMerchandise.get('name');
	const city = searchCity.get('city');
	const [loading, setLoading] = useState(true);
	const [storeName, setStoreName] = useState('');
	const [merchandiseImage, setMerchandiseImage] = useState('');
	const [merchandiseName, setMerchandiseName] = useState('');
	const [merchandiseCity, setMerchandiseCity] = useState('');
	const [merchandisePrice, setMerchandisePrice] = useState('');
	const [merchandiseDescription, setMerchandiseDescription] = useState('');
	const [merchandiseRating, setMerchandiseRating] = useState();
	const [ratings, setRatings] = useState([]);

	const getMerchandise = () => {
		const { productsID } = params;
		// apiRequest(`products/${productID}`, 'get')
		axios({
			method: 'get',
			url: 'https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/products/' + productsID,
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				const { storeName, image, productName, city, price, details, meanRating } = res.data.data;
				setStoreName(storeName);
				setMerchandiseImage(image);
				setMerchandiseName(productName);
				setMerchandiseCity(city);
				setMerchandisePrice(price);
				setMerchandiseDescription(details);
				setMerchandiseRating(meanRating);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getProductRatings = () => {
		const { productsID } = params;
		axios({
			method: 'get',
			url: 'https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/products/ratings/' + productsID,
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				const { data } = res.data;
				setRatings(data);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	const searchProduct = () => {
		// apiRequest(`products?page=1&limit=12&name=${searchParams.get('name')}`, 'get')
		axios({
			method: 'get',
			url: `https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/products?page=1&limit=12&name=${merchandise}&city=${city}`,
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const addToCart = () => {
		const { productsID } = params;
		// apiRequest(`cart`, 'post', { productsID }, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
		axios({
			method: 'post',
			url: 'https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/carts',
			data: {
				productID: +productsID,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				const { code, message } = res.data;
				if (code === 200) {
					Swal.fire({
						title: 'Success',
						text: message,
						icon: 'success',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getMerchandise();
		getProductRatings();
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<Layout>
				<div className='p-12 cursor-default'>
					<div className='flex flex-wrap justify-between gap-4'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Merchandise</h1>
						<div className='flex'>
							<input type='text' id='search-product-name' placeholder='Name..' onChange={(e) => setSearchMerchandise({ name: e.target.value })} className='px-4 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-product-city' placeholder='City..' onChange={(e) => setSearchCity({ ...merchandise, city: e.target.value })} className='px-4 border focus:outline-none' />
							<label htmlFor='search-product' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' id='search-product' className='hidden' onClick={() => searchProduct()} />
						</div>
					</div>
				</div>
				<div className='p-12 cursor-default'>
					<div className='grid grid-cols-1 gap-y-6 sm:gap-y-0 sm:grid-cols-4'>
						<div className='col-span-3'>
							<div>
								<h1>{merchandiseName}</h1>
								<p>Rp. {merchandisePrice}</p>
								<div className='flex space-x-1'>
									<div className='flex space-x-2'>
										<FaStar />
										<FaStar />
										<FaStar />
										<FaStar />
										<FaStarHalf />
									</div>
									<p>{merchandiseRating}</p>
								</div>
								<p>{merchandiseDescription}</p>
							</div>
							<div className='my-8 space-y-4'>
								<h1 className='text-xl font-bold'>Review</h1>
								<div className='flex flex-col'>
									{ratings.map((item) => {
										return (
											<div className='grid grid-cols-12 hover:bg-slate-100 hover:rounded-md' key={item.ratingID}>
												<div className='col-span-2 flex items-center justify-center'>
													<img src={item.image} alt={item.name} width={50} height={50} className='rounded-full' />
												</div>
												<div className='col-span-10 p-4'>
													<div className='flex flex-col space-y-2'>
														<p>{item.name}</p>
														<div className='flex space-x-2 items-center'>
															<div className='flex space-x-1'>
																<FaStar />
																<FaStar />
																<FaStar />
																<FaStar />
																<FaStarHalf />
															</div>
															<p>{merchandiseRating}</p>
														</div>
														<p>{item.review}</p>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div className='space-y-4 p-4 row-start-1 sm:row-start-auto'>
							<img src={merchandiseImage} alt={merchandiseName} className='w-full h-52' />
							<div className='flex justify-center items-center'>
								<button className='flex items-center space-x-2 py-2 px-5 rounded-md text-white bg-red-600 hover:bg-red-700 active:bg-red-800' onClick={() => [addToCart(), navigate('/cart')]}>
									<FaCartPlus />
									<span>Add to Cart</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
};

export default DetailMerchandise;
