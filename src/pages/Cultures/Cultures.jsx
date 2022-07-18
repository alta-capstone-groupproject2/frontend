/** @format */

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CardCulture from '../../components/Card/CardCulture';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import { apiRequest } from '../../utils/apiRequest';

const Events = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [cultures, setCultures] = useState([]);
	const searchCultureName = searchParams.get('name');
	const searchCultureCity = searchParams.get('city');

	const getCultures = () => {
		apiRequest('cultures?page=1&limit=12', 'get')
			.then((res) => {
				setCultures(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const searchCulture = () => {
		apiRequest(`cultures?page=1&limit=12&name=${searchCultureName}&city=${searchCultureCity}`, 'get')
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getCultures();
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<Layout>
				<div className='p-12'>
					<div className='flex justify-between'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Culture</h1>
						<div className='flex'>
							<input type='text' id='search-culture-name' placeholder='Name..' onChange={(e) => setSearchParams({ name: e.target.value })} className='px-4 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-culture-city' placeholder='City..' onChange={(e) => setSearchParams({ city: e.target.value })} className='px-4 border focus:outline-none' />
							<label htmlFor='searchCulture' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' value='submit' id='search-culture' onClick={() => searchCulture()} className='hidden' />
						</div>
					</div>
				</div>
				<div className='p-12'>
					<div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
						{cultures.map((item, index) => {
							return <CardCulture key={index} name={item.cultureName} city={item.city} image={item.image} onClickCulture={() => navigate(`/culture/${item.cultureID}`)} />;
						})}
					</div>
				</div>
			</Layout>
		);
	}
};

export default Events;
