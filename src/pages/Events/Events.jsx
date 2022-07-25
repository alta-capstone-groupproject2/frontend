/** @format */

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CardEvent from '../../components/Card/CardEvent';

import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import { apiRequest } from '../../utils/apiRequest';

const Events = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [event, setEvent] = useState([]);
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const eventName = searchParams.get('name');
	const eventCity = searchParams.get('city');

	const getEvent = () => {
		apiRequest('events?page=1&limit=30', 'get')
			.then((res) => {
				setEvent(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const handleSearch = () => {
		if (name !== '' && city !== '') {
			apiRequest(`events?page=1&limit=30&name=${name}&city=${city}`, 'get')
				.then((res) => {
					setEvent(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (name !== '') {
			apiRequest(`events?page=1&limit=30&name=${name}`, 'get')
				.then((res) => {
					setEvent(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (city !== '') {
			apiRequest(`events?page=1&limit=30&city=${city}`, 'get')
				.then((res) => {
					setEvent(res.data);
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
		if (eventName && eventCity) {
			apiRequest(`cultures?page=1&limit=30&name=${eventName}&city=${eventCity}`, 'get')
				.then((res) => {
					const { data } = res;
					setEvent(data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setLoading(false));
		} else if (eventName) {
			apiRequest(`cultures?page=1&limit=30&name=${eventName}`, 'get')
				.then((res) => {
					const { data } = res;
					setEvent(data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setLoading(false));
		} else if (eventCity) {
			apiRequest(`cultures?page=1&limit=30&city=${eventCity}`, 'get')
				.then((res) => {
					const { data } = res;
					setEvent(data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setLoading(false));
		} else {
			getEvent();
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
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Event</h1>
						<div className='flex'>
							<input type='text' id='search-event-name' placeholder='Name..' onChange={(e) => handleChange(e, 'name')} className='px-4 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-event-city' placeholder='City..' onChange={(e) => handleChange(e, 'city')} className='px-4 border focus:outline-none' />
							<label htmlFor='search-event' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' id='search-event' className='hidden' onClick={() => handleSearch()} />
						</div>
					</div>
				</div>
				<div className='p-12'>
					<div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
						{event.map((item) => {
							return <CardEvent key={item.id} name={item.eventName} city={item.city} image={item.image} onClickEvent={() => navigate(`/event/${item.eventID}`)} />;
						})}
					</div>
				</div>
			</Layout>
		);
	}
};

export default Events;