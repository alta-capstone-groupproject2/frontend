/** @format */

import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiRequest } from '../../utils/apiRequest';

const BCA = () => {
	const params = useParams();
	const navigate = useNavigate();

	const handlePayment = () => {
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
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => navigate('/events'));
	};

	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<div className='container p-8 space-y-8'>
				<h1 className='font-bold uppercase text-2xl'>bca virtual account</h1>
				<div className='grid grid-cols-1 sm:grid-cols-4'>
					<label htmlFor='input-bca-number' className='capitalize'>
						virtual account number
					</label>
					<input type='text' id='input-bca-number' className='col-span-3 py-2 px-4 border focus:border-2 focus:border-sky-400' />
				</div>
				<button className='capitalize py-2 px-6 rounded-md text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700'>order</button>
			</div>
		</div>
	);
};

export default BCA;
