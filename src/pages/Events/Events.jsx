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
	const searchEventName = searchParams.get('name');
	const searchEventCity = searchParams.get('city');

	const getEvent = () => {
		apiRequest('events?page=1&limit=12', 'get')
			.then((res) => {
				setEvent(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const searchEvent = () => {
		apiRequest(`events?page=1&limit=12&name=${searchEventName}&city=${searchEventCity}`, 'get')
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
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
					<div className='flex flex-wrap justify-between gap-4'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Event</h1>
						<div className='flex'>
							<input type='text' id='search-event-name' placeholder='Name..' onChange={(e) => setSearchParams({ name: e.target.value })} className='px-4 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-event-city' placeholder='City..' onChange={(e) => setSearchParams({ city: e.target.value })} className='px-4 border focus:outline-none' />
							<label htmlFor='search-event' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' id='search-event' className='hidden' onClick={() => searchEvent()} />
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