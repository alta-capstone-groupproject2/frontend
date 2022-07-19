/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/** @format */
import { useEffect, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import Map from '../../components/Map';
import { apiRequest } from '../../utils/apiRequest';
import Loading from '../../components/Loading';
import Layout from '../../components/Layout';
import Swal from 'sweetalert2';

const DetailEvent = () => {
	const params = useParams();
	const [loading, setLoading] = useState(true);
	const [position] = useState([-7.96662, 112.632629]);
	const [nameEvent, setNameEvent] = useState('');
	const [detail, setDetail] = useState('');
	const [city, setCity] = useState('');
	const [image, setImage] = useState('');
	const [currentTime, setCurrentTime] = useState('');
	const [dateEvent, setDateEvent] = useState('');
	const [comment, setComment] = useState([]);
	const [commentText, setCommentText] = useState('');
	const [hostedby, setHostedBy] = useState('');
	const [participant, setParticipant] = useState([]);
	const [profile, setProfile] = useState({});
	const isAfter = moment(dateEvent).isAfter(currentTime);

	const getDataEvent = () => {
		const { eventID } = params;
		apiRequest(`events/${eventID}`, 'get')
			.then((res) => {
				const { currentTime } = res;
				const { date, image, hostedBy, name, details, city, participant } = res.data;

				setCurrentTime(currentTime);
				setNameEvent(name);
				setDetail(details);
				setDateEvent(date);
				setImage(image);
				setHostedBy(hostedBy);
				setCity(city);
				setParticipant(participant);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const getComment = () => {
		const { eventID } = params;
		apiRequest(`events/comments/${eventID}`, 'get')
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
		const { eventID } = params;
		const data = {
			eventID: +eventID,
		};
		apiRequest('events/participations', 'post', data, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { code, message } = res;
				if (code === 200) {
					Swal.fire({
						title: 'Success',
						text: message,
						icon: 'success',
					});
					getDataEvent();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getDataEvent();
		getComment();
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<Layout>
				<div className='p-12'>
					<div className='mx-6 my-12 sm:mx-12'>
						<div className='grid grid-cols-6 gap-6 md:gap-0'>
							<div className='col-span-6 md:col-span-4 space-y-4'>
								<div className='space-y-6'>
									<div className='space-y-2'>
										<h1 className='text-2xl font-bold'>About this event</h1>
										<p>{detail}</p>
									</div>
									<div>
										<Map position={position} />
									</div>
								</div>
								<div className='space-y-6'>
									<div className='flex justify-between'>
										<h1 className='text-xl font-bold'>Participant</h1>
										{/* <p className='text-slate-400'>{participant.length} Participant</p> */}
									</div>
									<div>
										<div className='flex text-2xl space-x-6'>
											{/* {participant.map((item, index) => {
												return (
													<div key={index} className='flex flex-col items-center justify-center'>
														<img src={item.image} alt={item.name} width={'55px'} height={'55px'} className='rounded-full' />
														<p className='text-base'>{item.name}</p>
													</div>
												);
											})} */}
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
																<img src={item.image} alt={item.name} width={'55px'} height={'55px'} className='rounded-full' />
															</div>
															<div>
																<p className='font-bold text-xs sm:text-base'>{item.comment}</p>
																<p className='text-xs sm:text-base'>{item.name}</p>
															</div>
														</div>
													);
												})}
											</div>
										</div>
										<div className='flex justify-around'>
											<div className='flex items-center mr-4'>
												<img src={profile.url} alt={profile.name} width={'55px'} height={'55px'} className='rounded-full' />
											</div>
											<textarea name='comment' id='comment' placeholder='Write your comment' className='border border-slate-300 p-4 resize-none focus:outline-none w-full' onChange={(e) => setCommentText(e.target.value)} />
											<div className='flex items-center'>
												<button onClick={() => postComment()}>
													<RiSendPlaneFill className='text-red-700 text-2xl ml-4 cursor-pointer' />
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='md:p-4 col-span-6 md:col-span-2 row-start-1 md:row-start-auto space-y-4'>
								{isAfter ? null : <h1 className='bg-red-500/90 px-4 py-1 w-fit text-white rounded-full ml-auto translate-y-3 translate-x-6 select-none text-xs'>Event End</h1>}
								<div className='flex justify-center'>
									<img src={image} width={200} height={200} alt={nameEvent} />
								</div>
								<div className='flex justify-between'>
									<h1 className='text-xl font-bold'>{nameEvent}</h1>
									<p>
										{moment(dateEvent, 'DD-MM-YYYY').format('dddd')}, {moment(dateEvent).format('DD MMMM YYYY')}
									</p>
								</div>
								<h1>
									<span className='text-slate-400'>HostedBy : </span>
									{hostedby}
								</h1>
								<h1>
									<span className='text-slate-400'>Performers : </span>
									{/* {event.performers} */}
								</h1>
								<h1>
									<span className='text-slate-400'>City : </span> {city}
								</h1>
								<button
									disabled={isAfter ? false : true}
									onClick={() => handleJoinEvent()}
									className={`bg-sky-500 hover:bg-sky-600 text-white py-2 w-full rounded-md ${isAfter ? 'cursor-pointer' : 'cursor-not-allowed bg-slate-400 hover:bg-slate-400 text-slate-200'}`}>
									Join
								</button>
								<span className={`text-red-700 text-xs font-semibold ${isAfter ? 'hidden' : 'inline'}`}>*Can't cancel joining event no refund</span>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
};

export default DetailEvent;
