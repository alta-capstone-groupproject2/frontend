/* eslint-disable react-hooks/exhaustive-deps */
/** @format */

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { apiRequest } from '../../utils/apiRequest';
import CardProduct from '../../components/Card/CardProduct';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';

const Merchandise = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [merchandise, setMerchandise] = useState([]);
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const productName = searchParams.get('name');
	const productCity = searchParams.get('city');

	const getMerchandise = () => {
		apiRequest('products?page=1&limit=12', 'get')
			.then((res) => {
				const { data } = res;
				setMerchandise(data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const searchProduct = () => {
		if (name !== '' && city !== '') {
			apiRequest(`products?page=1&limit=12&name=${name}&city=${city}`, 'get')
				.then((res) => {
					const { data } = res;
					setMerchandise(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (name !== '') {
			apiRequest(`products?page=1&limit=12&name=${name}`, 'get')
				.then((res) => {
					const { data } = res;
					setMerchandise(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (city !== '') {
			apiRequest(`products?page=1&limit=12&city=${city}`, 'get')
				.then((res) => {
					const { data } = res;
					setMerchandise(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			Swal.fire({
				title: 'Error',
				text: 'Please fill input to search product',
				icon: 'error',
			});
		}
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

	useEffect(() => {
		if (productName && productCity) {
			apiRequest(`products?page=1&limit=12&name=${productName}&city=${productCity}`, 'get')
				.then((res) => {
					const { data } = res;
					setMerchandise(data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setLoading(false));
		} else if (productName) {
			apiRequest(`products?page=1&limit=12&name=${productName}`, 'get')
				.then((res) => {
					const { data } = res;
					setMerchandise(data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setLoading(false));
		} else if (productCity) {
			apiRequest(`products?page=1&limit=12&city=${productCity}`, 'get')
				.then((res) => {
					const { data } = res;
					setMerchandise(data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setLoading(false));
		} else {
			getMerchandise();
		}
	}, []);

	// useEffect for searchParams
	useEffect(() => {
		searchParams.get('name') ? setName(searchParams.get('name')) : setName('');
		searchParams.get('city') ? setCity(searchParams.get('city')) : setCity('');
	}, [searchParams]);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<Layout>
				<div className='p-12'>
					<div className='flex flex-wrap justify-between gap-4'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Merchandise</h1>
						<div className='flex'>
							<input type='text' id='search-product-name' placeholder='Name..' onChange={(e) => handleChange(e, 'name')} className='px-4 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-product-city' placeholder='City..' onChange={(e) => handleChange(e, 'city')} className='px-4 border focus:outline-none' />
							<label htmlFor='search-product' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' id='search-product' className='hidden' onClick={() => searchProduct()} />
						</div>
					</div>
				</div>
				<div className='p-12'>
					<div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
						{merchandise.map((item, index) => {
							return <CardProduct key={index} name={item.productName} price={item.price} image={item.image} onClickProduct={() => navigate(`/merchandise/${item.productID}`)} />;
						})}
					</div>
				</div>
			</Layout>
		);
	}
};

export default Merchandise;
