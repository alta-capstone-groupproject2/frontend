/** @format */

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import { apiRequest } from '../../utils/apiRequest';

const DetailCulture = () => {
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [cultureName, setCultureName] = useState('');
	const [city, setCity] = useState('');
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [reportMessage, setReportMessage] = useState('');
	const [searchCultureName, setSearchCultureName] = searchParams.get('name');
	const [searchCultureCity, setSearchCultureCity] = searchParams.get('city');

	const getDataCulture = () => {
		const { cultureID } = params;
		apiRequest(`cultures/${cultureID}`, 'get')
			.then((res) => {
				const { cultureName, city, image, details } = res.data;
				setCultureName(cultureName);
				setCity(city);
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
		apiRequest(`cultures/reports/${cultureID}`, 'post', body)
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

	const searchCulture = () => {
		apiRequest(`cultures?page=1&limit=12&name=${searchCultureName}&city=${searchCultureCity}`, 'get')
			.then((res) => {
				const { cultureName, city, image, details } = res.data;
				setCultureName(cultureName);
				setCity(city);
				setImage(image);
				setDescription(details);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getDataCulture();
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
							<label htmlFor='search-culture' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' value='submit' id='search-culture' className='hidden' onClick={() => searchCulture()} />
						</div>
					</div>
				</div>
				<div className='p-12'>
					<div className='w-full'>
						<div className='mb-5'>
							<h1 className='text-3xl'>{cultureName}</h1>
							<p className='text-lg'>{city}</p>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-4'>
							<div className='col-span-3'>
								<p>{description}</p>
							</div>
							<div className=''>
								<img src={image} alt={cultureName} />
								<div className='flex flex-col'>
									<label htmlFor='report' className='font-bold'>
										Note
									</label>
									<textarea id='report' className='border border-slate-300 p-2 resize-none focus:outline-none' rows='7' cols='50' onChange={(e) => setReportMessage(e.target.value)} />
									<div className='flex justify-end mt-4'>
										<button className='bg-red-600 hover:bg-red-700 text-white py-2 px-6 w-auto rounded-md' onClick={() => postReport()}>
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
