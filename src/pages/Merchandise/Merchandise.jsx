/** @format */

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { apiRequest } from '../../utils/apiRequest';
import CardProduct from '../../components/Card/CardProduct';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import axios from 'axios';

const Merchandise = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [merchandise, setMerchandise] = useState([]);

	const getMerchandise = () => {
		// apiRequest('merchandise?page=1&limit=12', 'get')
		axios({
			method: 'get',
			url: 'https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/products?page=`&limit=12',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				const { data } = res.data;
				setMerchandise(data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const searchProduct = () => {
		apiRequest(`merchandise?page=1&limit=12&name=${searchParams.get('name')}`, 'get')
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getMerchandise();
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<Layout>
				<div className='p-12'>
					<div className='flex flex-wrap justify-between gap-4'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Merchandise</h1>
						<div className='flex'>
							<input type='text' id='search-product-name' placeholder='Name..' onChange={(e) => setSearchParams({ name: e.target.value })} className='px-4 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-product-city' placeholder='City..' onChange={(e) => setSearchParams({ city: e.target.value })} className='px-4 border focus:outline-none' />
							<label htmlFor='search-product' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' id='search-product' className='hidden' onClick={() => searchProduct()} />
						</div>
					</div>
				</div>
				<div className='p-12'>
					<div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
						{merchandise.map((item) => {
							return <CardProduct key={item.productID} name={item.productName} price={item.price} image={item.image} onClickProduct={() => navigate(`/merchandise/${item.productID}`)} />;
						})}
					</div>
				</div>
			</Layout>
		);
	}
};

export default Merchandise;
