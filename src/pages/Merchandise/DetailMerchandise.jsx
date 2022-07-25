/** @format */

import { useEffect, useState } from 'react';
import { FaCartPlus, FaSearch, FaStar, FaStarHalf } from 'react-icons/fa';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import { apiRequest } from '../../utils/apiRequest';

const DetailMerchandise = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
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
		apiRequest(`products/${productsID}`, 'get')
			.then((res) => {
				const { storeName, image, productName, city, price, details, meanRating } = res.data;
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
		apiRequest(`products/ratings/${productsID}`, 'get')
			.then((res) => {
				const { data } = res;
				setRatings(data);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	const addToCart = () => {
		const { productsID } = params;
		apiRequest(`carts`, 'post', { productID: +productsID }, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { message } = res.data;
				Swal.fire({
					title: message,
					text: 'To add qty, click on the cart icon again',
					icon: 'info',
					confirmButtonColor: '#d60400',
					confirmButtonText: 'No, take me to the cart',
				}).then((result) => {
					if (result.isConfirmed) {
						navigate('/cart');
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e, type) => {
		const val = e.target.value;
		const params = {};
		searchParams.forEach((value, key) => {
			params[key] = value;
		});
		let newSearch = { ...params };
		if (type === 'name') {
			if (val !== '') {
				newSearch = { ...newSearch, name: val };
				setSearchParams(newSearch);
			} else {
				searchParams.delete('name');
				setSearchParams(searchParams);
			}
		} else {
			if (val !== '') {
				newSearch = { ...newSearch, city: val };
				setSearchParams(newSearch);
			} else {
				searchParams.delete('city');
				setSearchParams(searchParams);
			}
		}
	};

	const handleSearch = () => {
		if (name !== '' && city !== '') {
			navigate(`/merchandise?name=${name}&city=${city}`);
		} else if (name !== '') {
			navigate(`/merchandise?name=${name}`);
		} else if (city !== '') {
			navigate(`/merchandise?city=${city}`);
		} else {
			Swal.fire({
				title: 'Error',
				text: 'Please fill input to search product',
				icon: 'error',
			});
		}
	};

	useEffect(() => {
		getMerchandise();
		getProductRatings();
	}, []);

	useEffect(() => {
		searchParams.get('name') ? setName(searchParams.get('name')) : setName('');
		searchParams.get('city') ? setCity(searchParams.get('city')) : setCity('');
	}, [searchParams]);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<Layout>
				<div className='p-12 cursor-default'>
					<div className='flex flex-wrap justify-between gap-4'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Merchandise</h1>
						<div className='flex'>
							<input type='text' id='search-product-name' placeholder='Name..' onChange={(e) => handleChange(e, 'name')} className='px-4 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-product-city' placeholder='City..' onChange={(e) => handleChange(e, 'city')} className='px-4 border focus:outline-none' />
							<label htmlFor='search-product' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' id='search-product' className='hidden' onClick={() => handleSearch()} />
						</div>
					</div>
				</div>
				<div className='p-12 cursor-default'>
					<div className='grid grid-cols-1 gap-y-6 sm:gap-y-0 sm:grid-cols-4'>
						<div className='col-span-3'>
							<div>
								<h1 id='product-name'>{merchandiseName}</h1>
								<p id='product-price'>Rp. {merchandisePrice}</p>
								<div className='flex space-x-1'>
									<div className='flex space-x-2'>
										<FaStar />
										<FaStar />
										<FaStar />
										<FaStar />
										<FaStarHalf />
									</div>
									<p id='product-rating'>{merchandiseRating}/5</p>
								</div>
								<p id='product-description'>{merchandiseDescription}</p>
							</div>
							<div className='my-8 space-y-4'>
								<h1 className='text-xl font-bold'>Review</h1>
								<div className='flex flex-col'>
									{ratings.length < 1 ? (
										<div>
											<p className='text-slate-400'>
												Produk ini belum memiliki rating.
												<br />
												silahkan beli dan berikan ulasan anda tentang produk ini.
											</p>
										</div>
									) : (
										ratings.map((item) => {
											return (
												<div id='rating-list' className='grid grid-cols-12 hover:bg-slate-100 hover:rounded-md' key={item.ratingID}>
													<div className='col-span-2 flex items-center justify-center'>
														<img id='user-avatar' src={item.image} alt={item.name} width={50} height={50} className='rounded-full' />
													</div>
													<div className='col-span-10 p-4'>
														<div className='flex flex-col space-y-2'>
															<p id='user-name'>{item.name}</p>
															<div className='flex space-x-2 items-center'>
																<div className='flex space-x-1'>
																	<FaStar />
																	<FaStar />
																	<FaStar />
																	<FaStar />
																	<FaStarHalf />
																</div>
																<p id='product-rating'>{merchandiseRating}</p>
															</div>
															<p id='user-review'>{item.review}</p>
														</div>
													</div>
												</div>
											);
										})
									)}
								</div>
							</div>
						</div>
						<div className='space-y-4 p-4 row-start-1 sm:row-start-auto'>
							<img id='product-image' src={merchandiseImage} alt={merchandiseName} className='w-full h-52' />
							<div className='flex justify-center items-center'>
								<button id='add-to-cart' className='flex items-center space-x-2 py-2 px-5 rounded-md text-white bg-red-600 hover:bg-red-700 active:bg-red-800' onClick={() => addToCart()}>
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
