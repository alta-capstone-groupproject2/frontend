/** @format */

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import { apiRequest } from '../../utils/apiRequest';

const DetailCulture = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [cultureName, setCultureName] = useState('');
	const [cultureCity, setCultureCity] = useState('');
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [reportMessage, setReportMessage] = useState('');
	const [name, setName] = useState('');
	const [city, setCity] = useState('');

	const getDataCulture = () => {
		const { cultureID } = params;
		apiRequest(`cultures/${cultureID}`, 'get')
			.then((res) => {
				const { cultureName, city, image, details } = res.data;
				setCultureName(cultureName);
				setCultureCity(city);
				setImage(image);
				setDescription(details);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const postReport = () => {
		const { cultureID } = params;
		const body = {
			message: reportMessage,
		};
		apiRequest(`cultures/reports/${cultureID}`, 'post', body, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				Swal.fire({
					title: 'Success',
					text: 'Your report has been sent',
					icon: 'success',
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
			navigate(`/cultures?name=${name}&city=${city}`);
		} else if (name !== '') {
			navigate(`/cultures?name=${name}`);
		} else if (city !== '') {
			navigate(`/cultures?city=${city}`);
		} else {
			Swal.fire({
				title: 'Error',
				text: 'Please fill input to search product',
				icon: 'error',
			});
		}
	};

	useEffect(() => {
		getDataCulture();
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
					<div className='flex justify-between'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Culture</h1>
						<div className='flex'>
							<input type='text' id='search-culture-name' placeholder='Name..' onChange={(e) => handleChange(e, 'name')} className='px-4 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-culture-city' placeholder='City..' onChange={(e) => handleChange(e, 'city')} className='px-4 border focus:outline-none' />
							<label htmlFor='search-culture' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' value='submit' id='search-culture' onClick={() => handleSearch()} className='hidden' />
						</div>
					</div>
				</div>
				<div className='p-12'>
					<div className='w-full'>
						<div className='mb-5'>
							<h1 id='culture-name' className='text-3xl'>
								{cultureName}
							</h1>
							<p id='culture-city-location' className='text-lg'>
								{cultureCity}
							</p>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-4'>
							<div className='col-span-3'>
								<p id='description-culture'>{description}</p>
							</div>
							<div className=''>
								<img id='image-culture' src={image} alt={cultureName} />
								<div className='flex flex-col'>
									<label htmlFor='report' className='font-bold'>
										Note
									</label>
									<textarea id='report-culture' className='border border-slate-300 p-2 resize-none focus:outline-none' rows='7' cols='50' onChange={(e) => setReportMessage(e.target.value)} />
									<div className='flex justify-end mt-4'>
										<button id='report-submit' className='bg-red-600 hover:bg-red-700 text-white py-2 px-6 w-auto rounded-md' onClick={() => postReport()}>
											Submit
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
};

export default DetailCulture;