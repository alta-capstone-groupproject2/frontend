/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/** @format */
import { useEffect, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import moment from 'moment';

import Map from '../../components/Map';
import { apiRequest } from '../../utils/apiRequest';
import Loading from '../../components/Loading';
import Layout from '../../components/Layout';
import Swal from 'sweetalert2';
import { FaSearch } from 'react-icons/fa';

const DetailEvent = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [position] = useState([-7.96662, 112.632629]);
	const [nameEvent, setNameEvent] = useState('');
	const [detail, setDetail] = useState('');
	const [cultureCity, setCultureCity] = useState('');
	const [image, setImage] = useState('');
	const [currentTime, setCurrentTime] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [comment, setComment] = useState([]);
	const [commentText, setCommentText] = useState('');
	const [hostedby, setHostedBy] = useState('');
	const [participant, setParticipant] = useState([]);
	const [profile, setProfile] = useState({});
	const [name, setName] = useState('');
	const [city, setCity] = useState('');

	const getDataEvent = () => {
		const { eventID } = params;
		apiRequest(`events/${eventID}`, 'get')
			.then((res) => {
				const { currentTime } = res;
				const { image, hostedBy, eventName, details, city, participant, startDate, endDate } = res.data;

				setCurrentTime(currentTime);
				setNameEvent(eventName);
				setDetail(details);
				setImage(image);
				setHostedBy(hostedBy);
				setCultureCity(city);
				setParticipant(participant);
				setStartDate(startDate);
				setEndDate(endDate);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const getComment = () => {
		const { eventID } = params;
		apiRequest(`events/comments/${eventID}`, 'get', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { data } = res;
				setComment(data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const postComment = () => {
		const { eventID } = params;
		const data = {
			comment: commentText,
			eventID: +eventID,
		};
		apiRequest('events/comments', 'post', data, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { code } = res;
				if (code === 200) {
					getComment();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleJoinEvent = () => {
		Swal.fire({
			title: 'Payment only accept bank BCA',
			text: 'Are you sure?!',
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#4aff7e',
			cancelButtonColor: '#ff4848',
			confirmButtonText: 'Yes, Join Event!',
		}).then((result) => {
			if (result.isConfirmed) {
				navigate('/payment/bca');
			}
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
			navigate(`/events?name=${name}&city=${city}`);
		} else if (name !== '') {
			navigate(`/events?name=${name}`);
		} else if (city !== '') {
			navigate(`/events?city=${city}`);
		} else {
			Swal.fire({
				title: 'Error',
				text: 'Please fill input to search product',
				icon: 'error',
			});
		}
	};

	useEffect(() => {
		getDataEvent();
		getComment();
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
				<div className='p-3 sm:p-12'>
					<div className='flex flex-wrap justify-between gap-4'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Event</h1>
						<div className='flex flex-wrap'>
							<input type='text' id='search-event-name' placeholder='Name..' onChange={(e) => handleChange(e, 'name')} className='p-3 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-event-city' placeholder='City..' onChange={(e) => handleChange(e, 'city')} className='p-3 border focus:outline-none' />
							<label htmlFor='search-event' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' id='search-event' className='hidden' onClick={() => handleSearch()} />
						</div>
					</div>
				</div>
				<div className='p-3 sm:p-12'>
					<div className='mx-6 my-12 sm:mx-12'>
						<div className='grid grid-cols-6 gap-6 md:gap-0'>
							<div className='col-span-6 md:col-span-4 space-y-4'>
								<div className='space-y-6'>
									<div className='space-y-2'>
										<h1 className='text-2xl font-bold'>About this event</h1>
										<p id='event-detail'>{detail}</p>
									</div>
									<div>
										<Map position={position} />
									</div>
								</div>
								<div className='space-y-6'>
									<div className='flex justify-between'>
										<h1 className='text-xl font-bold'>Participant</h1>
										<p id='participant-length' className='text-slate-400'>
											{participant.length} Participant
										</p>
									</div>
									<div>
										<div className='flex space-x-2 sm:space-x-6 overflow-auto'>
											{participant.map((item, index) => {
												return (
													<div key={index} className='flex flex-col'>
														<img id='user-participation-avatar' src={item.image} alt={item.name} width={'55px'} height={'55px'} className='rounded-full' />
														<p id='user-participation-name' className='text-base'>
															{item.name}
														</p>
													</div>
												);
											})}
										</div>
									</div>
									<div className='bg-slate-100 px-4 py-8'>
										<div className='space-y-4'>
											<h1 className='text-xl font-bold'>Comment</h1>
											<div className='space-y-2 py-2 h-52 overflow-y-auto'>
												{comment.map((item) => {
													return (
														<div className='bg-slate-200 hover:bg-slate-300 p-4 space-y-4 rounded-md flex items-center space-x-4' key={item.commentID}>
															<div className='flex items-center justify-center'>
																<img id='user-comment-avatar' src={item.image} alt={item.name} width={'55px'} height={'55px'} className='rounded-full' />
															</div>
															<div>
																<p id='user-comment' className='font-bold text-xs sm:text-base'>
																	{item.comment}
																</p>
																<p id='user-comment-name' className='text-xs sm:text-base'>
																	{item.name}
																</p>
															</div>
														</div>
													);
												})}
											</div>
										</div>
										<div className='flex justify-around'>
											<div className='flex items-center mr-4'>
												<img id='user-avatar' src={profile.url} alt={profile.name} width={'55px'} height={'55px'} className='rounded-full' />
											</div>
											<textarea name='comment' id='comment' placeholder='Write your comment' className='border border-slate-300 p-4 resize-none focus:outline-none w-full' onChange={(e) => setCommentText(e.target.value)} />
											<div className='flex items-center'>
												<button id='post-comment' onClick={() => postComment()}>
													<RiSendPlaneFill className='text-red-700 text-2xl ml-4 cursor-pointer' />
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='md:p-4 col-span-6 md:col-span-2 row-start-1 md:row-start-auto space-y-4'>
								{endDate ? null : <h1 className='bg-red-500/90 px-4 py-1 w-fit text-white rounded-full ml-auto translate-y-3 translate-x-6 select-none text-xs'>Event End</h1>}
								<div className='flex justify-center'>
									<img id='event-image' src={image} width={200} height={200} alt={nameEvent} />
								</div>
								<div className='flex flex-wrap justify-between'>
									<h1 id='event-name' className='text-xl font-bold pr-4'>
										{nameEvent}
									</h1>
									<p id='event-date'>
										{moment(startDate, 'DD-MM-YYYY').format('dddd')}, {moment(startDate).format('DD MMMM YYYY')} ~ {moment(endDate, 'DD-MM-YYYY').format('dddd')}, {moment(endDate).format('DD MMMM YYYY')}
									</p>
								</div>
								<h1 id='event-hostedby'>
									<span className='text-slate-400'>HostedBy : </span>
									{hostedby}
								</h1>
								<h1 id='event-location-city'>
									<span className='text-slate-400'>City : </span> {cultureCity}
								</h1>
								<button
									id='join-event'
									// disabled={isAfter ? false : true}
									onClick={() => handleJoinEvent()}
									className={`bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-2 w-full rounded-md`}>
									Join
								</button>
								<span className={`text-red-700 text-xs font-semibold`}>*Can't cancel joining event no refund</span>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
};

export default DetailEvent;
