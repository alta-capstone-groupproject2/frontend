/** @format */

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CardEvent from '../../components/Card/CardEvent';

import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import { apiRequest } from '../../utils/apiRequest';

const Events = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [event, setEvent] = useState([]);
	const [searchName, setSearchName] = useState('');
	const [searchCity, setSearchCity] = useState('');

	const handleSearch = (e, type) => {
		e.preventDefault();
		const value = e.target.value;
		if (type === 'name') {
			setSearchName(value);
		} else if (type === 'city') {
			setSearchCity(value);
		}
	};

	const getEvent = () => {
		apiRequest('events', 'get')
			.then((res) => {
				setEvent(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		getEvent();
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<Layout>
				<div className='p-12'>
					<div className='flex justify-between'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Event</h1>
						<div className='flex'>
							<input type='text' id='search-event' placeholder='Name..' onChange={(e) => handleSearch(e, 'name')} className='px-4 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-city' placeholder='City..' onChange={(e) => handleSearch(e, 'city')} className='px-4 border focus:outline-none' />
							{/* <label htmlFor='search' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label> */}
							<input type='submit' id='search' className='bg-sky-500 py-1 px-2 text-white cursor-pointer rounded-r' onClick={() => navigate({ pathname: '/search', query: { name: searchName, city: searchCity } })} />
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
