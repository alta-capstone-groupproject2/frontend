/** @format */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdOutlineContentCopy } from 'react-icons/md';
import moment from 'moment';

import { apiRequest } from '../../utils/apiRequest';
import Loading from '../../components/Loading';
import Navbar from '../../components/Header';

const BCA = () => {
	const params = useParams();
	const [detailPayment, setDetailPayment] = useState([]);
	const [billNumber, setBillNumber] = useState();
	const [loading, setLoading] = useState(true);

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
		apiRequest(`events/payments/status/${orderID}`, 'get', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { data } = res;
				Swal.fire({
					title: 'Status Payment',
					icon: data.transactionStatus === 'settlement' ? 'success' : 'error',
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
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'copied',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	const getDetailPayment = () => {
		apiRequest('events/payment_details?limit=10&page=1', 'get', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { data } = res;
				setDetailPayment(data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		getDetailPayment();
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<div className='space-y-12'>
				<Navbar />
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
				<div className='w-auto p-8 overflow-auto'>
					<h1 className='font-bold text-2xl text-center my-4 w-full'>Status Payments</h1>
					<table className='border-collapse'>
						<tbody>
							<tr className='bg-slate-200 border'>
								<th className='px-12 text-center border'>Name Event</th>
								<th className='px-12 text-center border'>Date</th>
								<th className='px-12 text-center border'>City</th>
								<th className='px-12 text-center border'>Order ID</th>
								<th className='px-12 text-center border'>Gross Amount</th>
								<th className='px-12 text-center border'>Payment Method</th>
								<th className='px-12 text-center border'>Transaction ID</th>
								<th className='px-12 text-center border'>Status</th>
								<th className='px-12 text-center border'>Status Detail</th>
							</tr>
							{detailPayment.map((item, index) => {
								return (
									<tr key={index} className='hover:bg-slate-100'>
										<td className='px-12 text-center capitalize border'>{item.name}</td>
										<td className='px-12 text-center capitalize border'>{item.date}</td>
										<td className='px-12 text-center capitalize border'>{item.city}</td>
										<td className='px-12 text-center border'>{item.orderID}</td>
										<td className='px-12 text-center capitalize border'>{item.grossAmount}</td>
										<td className='px-12 text-center capitalize border'>{item.paymentMethod}</td>
										<td className='px-12 text-center border'>{item.transactionID}</td>
										<td className='px-12 text-center capitalize border'>{item.status}</td>
										<td className='px-12 text-center capitalize border'>
											<button onClick={() => getStatusPayment(item.orderID)}>Show</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
};
export default BCA;
