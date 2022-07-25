/** @format */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdOutlineContentCopy } from 'react-icons/md';
import moment from 'moment';

import { apiRequest } from '../../utils/apiRequest';

const BCA = () => {
	const params = useParams();
	const [detailPayment, setDetailPayment] = useState([]);
	const [statusPayment, setStatusPayment] = useState([]);
	const [billNumber, setBillNumber] = useState();

	const handlePayment = () => {
		const { eventID } = params;
		const data = {
			eventID: +eventID,
			paymentMethod: 'BANK_TRANSFER_BCA',
		};
		apiRequest('events/payments', 'post', data, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { code, message } = res;
				const { billNumber } = res.data;
				setBillNumber(billNumber);

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
			});
	};

	const getStatusPayment = (orderID) => {
		console.log(orderID);
		apiRequest(`events/payments/status/${orderID}`, 'get', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { data } = res;
				setStatusPayment(data);
				Swal.fire({
					title: 'Status Payment',
					icon: data.transactionStatus === 'paid' ? 'success' : data.transactionStatus === 'pending' ? 'info' : 'error',
					html:
						`<p>Order ID : ${data.orderID}</p>` +
						`<p>Transaction ID : ${data.transactionID}</p>` +
						`<p>Payment Method : ${data.paymentMethod}</p>` +
						`<p>Bill Number : ${data.billNumber}</p>` +
						`<p>Bank : ${data.bank}</p>` +
						`<p>Gross Amount : ${data.grossAmount}</p>` +
						`<p>Transaction Time : ${moment(data.transactionTime).format('DD MMMM YYYY')}</p>` +
						`<p>Transaction Expired : ${moment(data.transactionExpired).format('DD MMMM YYYY')}</p>` +
						`<p>Transaction Status : ${data.transactionStatus}</p>`,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(billNumber);
	};

	const getDetailPayment = () => {
		apiRequest('events/payment_details?limit=10&page=1', 'get', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { data } = res;
				setDetailPayment(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getDetailPayment();
	}, []);

	return (
		<div className='space-y-12'>
			<div className='w-full h-screen flex justify-center items-center'>
				<div className='container p-8 space-y-8'>
					<h1 className='font-bold uppercase text-2xl text-red-600'>bca virtual account</h1>
					<div className='grid grid-cols-1 sm:grid-cols-4'>
						<label htmlFor='input-bca-number' className='capitalize'>
							virtual account number
						</label>
						<div className='col-span-3'>
							<input type='text' id='input-bca-number' value={billNumber && billNumber} className='w-full py-2 px-4 border focus:border-2 focus:border-sky-400' />
							<button onClick={() => handleCopy()} className='absolute -ml-6 mt-3 text-lg' hidden={billNumber ? false : true}>
								<MdOutlineContentCopy />
							</button>
						</div>
					</div>
					<div className='flex space-x-6'>
						<button onClick={() => handlePayment()} className='capitalize py-2 px-6 rounded-md font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800'>
							Generate
						</button>
						<a href='https://simulator.sandbox.midtrans.com/bca/va/index' target='blank' className='capitalize py-2 px-6 rounded-md border text-red-500 font-bold bg-slate-100 hover:bg-slate-200 active:bg-slate-300'>
							Move to Payment
						</a>
					</div>
				</div>
			</div>
			<div className='w-full p-8 overflow-auto'>
				<h1 className='font-bold text-2xl text-center my-4'>Status Payments</h1>
				<div className='bg-slate-200 border'>
					<div className='grid grid-cols-9 gap-x-8 space-x-5'>
						<h1 className='text-center px-5 py-2 border'>Name Event</h1>
						<h1 className='text-center px-5 py-2 border'>Date</h1>
						<h1 className='text-center px-5 py-2 border'>City</h1>
						<h1 className='text-center px-5 py-2 border'>Order ID</h1>
						<h1 className='text-center px-5 py-2 border'>Gross Amount</h1>
						<h1 className='text-center px-5 py-2 border'>Payment Method</h1>
						<h1 className='text-center px-5 py-2 border'>Transaction ID</h1>
						<h1 className='text-center px-5 py-2 border'>Status</h1>
						<h1 className='text-center px-5 py-2 border'>Status Detail</h1>
					</div>
				</div>
				<div className='w-full'>
					{detailPayment.map((item, index) => {
						return (
							<div className='grid grid-cols-9 gap-x- space-x-5' key={index}>
								<h1>{item.name}</h1>
								<h1>{item.date}</h1>
								<h1>{item.city}</h1>
								<h1>{item.orderID}</h1>
								<h1>{item.grossAmount}</h1>
								<h1>{item.paymentMethod}</h1>
								<h1>{item.transactionID}</h1>
								<h1>{item.status}</h1>
								<button onClick={() => getStatusPayment(item.orderID)}>Show</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default BCA;
