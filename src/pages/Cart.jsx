/** @format */

import { useEffect, useState } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiRequest } from '../utils/apiRequest';

import Layout from '../components/Layout';
import Loading from '../components/Loading';

const Cart = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [cart, setCart] = useState([]);
	const [cartQty, setCartQty] = useState(1);
	const [totalPrice, setTotalPrice] = useState();
	const [cartsID, setCartID] = useState([]);
	const [name, setName] = useState('');
	const [city, setCity] = useState('');

	const getCart = () => {
		apiRequest('carts', 'get', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { data } = res;
				setCart(data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteCart = (cartID) => {
		apiRequest(`carts/${cartID}`, 'delete', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { code, message } = res.data;
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
			.finally(() => getCart());
	};

	const getAllCartID = () => {
		let temp = [];
		cart.forEach((item) => item.cartID && temp.push(item.cartID));
		return setCartID(temp);
	};

	const getTotalPrice = () => {
		let total = 0;
		cart.forEach((item) => {
			total += item.price * item.qty;
		});
		return setTotalPrice(total);
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
			navigate(`/merchandise?name=${name}&city=${city}`);
		} else if (name !== '') {
			navigate(`/merchandise?name=${name}`);
		} else if (city !== '') {
			navigate(`/merchandise?city=${city}`);
		} else {
			Swal.fire({
				title: 'Error',
				text: 'Please fill input to search product',
				icon: 'error',
			});
		}
	};

	const orderCart = () => {
		const body = {
			cartid: cartsID,
		};
		apiRequest('orders', 'post', body, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				const { code } = res;
				if (code === 200) {
					navigate('/payment');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getCart();
		getAllCartID();
		getTotalPrice();
		setLoading(false);
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
				<div className='p-12 cursor-default'>
					<div className='flex flex-wrap justify-between gap-4'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Merchandise</h1>
						<div className='flex flex-wrap'>
							<input type='text' id='search-product-name' placeholder='Name..' onChange={(e) => handleChange(e, 'name')} className='px-4 py-3 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-product-city' placeholder='City..' onChange={(e) => handleChange(e, 'city')} className='px-4 py-3 border focus:outline-none' />
							<label htmlFor='search-product' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' id='search-product' className='hidden' onClick={() => handleSearch()} />
						</div>
					</div>
				</div>
				<div className='p-12 space-y-4'>
					{cart.map((item) => {
						return (
							<div className='grid grid-cols-1 gap-y-4 sm:gap-y-0 border sm:border-0 sm:grid-cols-12 hover:bg-slate-100 hover:rounded-md hover:shadow-sm p-6 cursor-default'>
								<div className='col-span-2 flex items-center justify-center'>
									<img id='product-image' src={item.image} alt={item.name} />
								</div>
								<div className='col-span-3'>
									<div className='space-y-2 text-center'>
										<p id='product-name'>{item.name}</p>
										<p id='product-price'>Rp. {item.price}</p>
									</div>
								</div>
								<div className='col-span-3'>
									<div className='space-y-2 text-center'>
										<p>Qty</p>
										<p id='product-qty'>{item.qty}</p>
									</div>
								</div>
								<div className='col-span-3'>
									<div className='space-y-2 text-center'>
										<p>Sub Total</p>
										<p id='product-subtotal'>Rp. {item.price}</p>
									</div>
								</div>
								<button id='delete-cart' className='flex justify-center items-center' onClick={() => deleteCart(item.cartID)}>
									<FaTrash className='font-bold text-xl text-red-600 hover:text-red-700 active:text-red-800' />
								</button>
							</div>
						);
					})}
				</div>
				<div className='p-12'>
					<div className='flex flex-col items-end space-y-4'>
						<p id='total-price' className='text-center font-bold'>
							Total Price : Rp. {totalPrice}
						</p>
						<button id='order-cart' onClick={() => orderCart()} className='py-2 px-5 rounded-md text-white bg-red-600 hover:bg-red-700 active:bg-red-800'>
							Payment
						</button>
					</div>
				</div>
			</Layout>
		);
	}
};

export default Cart;
