/* eslint-disable react-hooks/exhaustive-deps */
/** @format */

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CardCulture from '../../components/Card/CardCulture';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import { apiRequest } from '../../utils/apiRequest';

const Cultures = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [cultures, setCultures] = useState([]);
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const cultureName = searchParams.get('name');
	const cultureCity = searchParams.get('city');

	const getCultures = () => {
		apiRequest('cultures?page=1&limit=12', 'get')
			.then((res) => {
				setCultures(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const handleSearch = () => {
		if (name !== '' && city !== '') {
			apiRequest(`cultures?page=1&limit=12&name=${name}&city=${city}`, 'get')
				.then((res) => {
					setCultures(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (name !== '') {
			apiRequest(`cultures?page=1&limit=12&name=${name}`, 'get')
				.then((res) => {
					setCultures(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (city !== '') {
			apiRequest(`cultures?page=1&limit=12&city=${city}`, 'get')
				.then((res) => {
					setCultures(res.data);
				})
				.catch((err) => {
					console.log(err);
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
		if (cultureName && cultureCity) {
			apiRequest(`cultures?page=1&limit=12&name=${cultureName}&city=${cultureCity}`, 'get')
				.then((res) => {
					const { data } = res;
					setCultures(data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setLoading(false));
		} else if (cultureName) {
			apiRequest(`cultures?page=1&limit=12&name=${cultureName}`, 'get')
				.then((res) => {
					const { data } = res;
					setCultures(data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setLoading(false));
		} else if (cultureCity) {
			apiRequest(`cultures?page=1&limit=12&city=${cultureCity}`, 'get')
				.then((res) => {
					const { data } = res;
					setCultures(data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setLoading(false));
		} else {
			getCultures();
		}
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
				<div className='p-12'>
					<div className='flex flex-wrap justify-between gap-4'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Culture</h1>
						<div className='flex'>
							<input type='text' id='search-culture-name' placeholder='Name..' onChange={(e) => handleChange(e, 'name')} className='p-3 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-culture-city' placeholder='City..' onChange={(e) => handleChange(e, 'city')} className='p-3 border focus:outline-none' />
							<label htmlFor='search-culture' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' value='submit' id='search-culture' onClick={() => handleSearch()} className='hidden' />
						</div>
					</div>
				</div>
				<div className='p-12'>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{cultures.map((item, index) => {
							return <CardCulture key={index} name={item.name} city={item.city} image={item.image} onClickCulture={() => navigate(`/culture/${item.cultureID}`)} />;
						})}
					</div>
				</div>
			</Layout>
		);
	}
};

export default Cultures;