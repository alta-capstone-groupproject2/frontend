/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';
import Loading from '../components/Loading';

const Cart = () => {
	const [searchMerchandise, setSearchMerchandise] = useSearchParams();
	const [searchCity, setSearchCity] = useSearchParams();
	const merchandise = searchMerchandise.get('name');
	const city = searchCity.get('city');
	const [loading, setLoading] = useState(true);
	const [cart, setCart] = useState([]);
	const [cartQty, setCartQty] = useState(1);
	const [totalPrice, setTotalPrice] = useState();
	const [cartsID, setCartID] = useState([]);

	const getCart = () => {
		axios({
			method: 'get',
			url: 'https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/carts',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				const { data } = res.data;
				setCart(data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const searchProduct = () => {
		// apiRequest(`products?page=1&limit=12&name=${searchParams.get('name')}`, 'get')
		axios({
			method: 'get',
			url: `https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/products?page=1&limit=12&name=${merchandise}&city=${city}`,
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateCart = (id) => {
		axios({
			method: 'put',
			url: `https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/carts/${id}`,
			data: {
				qty: cartQty,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => getCart());
	};

	const deleteCart = (cartID) => {
		axios({
			method: 'delete',
			url: `https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/carts/${cartID}`,
			headers: {
				'Content-Type': 'application/json',
			},
		})
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

	const orderCart = () => {
		axios({
			method: 'post',
			url: `https://virtserver.swaggerhub.com/Alfin7007/lamiApp/1.0/orders`,
			data: {
				cartid: cartsID,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => getCart());
	};

	const getAllCartID = () => {
		let temp = [];
		cart.forEach((item) => item.cartID && temp.push(item.cartID));
		setCartID(temp);
	};

	const getTotalPrice = () => {
		let total = 0;
		cart.forEach((item) => {
			total += item.price * item.qty;
		});
		setTotalPrice(total);
	};

	useEffect(() => {
		getTotalPrice();
		getAllCartID();
		getCart();
		setLoading(false);
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<Layout>
				<div className='p-12 cursor-default'>
					<div className='flex flex-wrap justify-between gap-4'>
						<h1 className='font-bold border-b-2 border-red-700 pr-4 text-lg cursor-default'>Merchandise</h1>
						<div className='flex flex-wrap'>
							<input type='text' id='search-product-name' placeholder='Name..' onChange={(e) => setSearchMerchandise({ name: e.target.value })} className='px-4 py-3 border focus:outline-none rounded-tl-md rounded-bl-md' />
							<input type='text' id='search-product-city' placeholder='City..' onChange={(e) => setSearchCity({ ...merchandise, city: e.target.value })} className='px-4 py-3 border focus:outline-none' />
							<label htmlFor='search-product' className='flex items-center justify-center p-3 bg-red-700 text-white cursor-pointer'>
								<FaSearch />
							</label>
							<input type='submit' id='search-product' className='hidden' onClick={() => searchProduct()} />
						</div>
					</div>
				</div>
				<div className='p-12 space-y-4'>
					{cart.map((item) => {
						return (
							<div className='grid grid-cols-1 gap-y-4 sm:gap-y-0 border sm:border-0 sm:grid-cols-12 hover:bg-slate-100 hover:rounded-md hover:shadow-sm p-6 cursor-default'>
								<div className='col-span-2 flex items-center justify-center'>
									<img src={item.image} alt={item.name} />
								</div>
								<div className='col-span-3'>
									<div className='space-y-2 text-center'>
										<p>{item.name}</p>
										<p>Rp. {item.price}</p>
									</div>
								</div>
								<div className='col-span-3'>
									<div className='space-y-2 text-center'>
										<p>Qty</p>
										<p>{item.qty}</p>
									</div>
								</div>
								<div className='col-span-3'>
									<div className='space-y-2 text-center'>
										<p>Sub Total</p>
										<p>Rp. {item.price}</p>
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
						<p className='text-center font-bold'>Total Price : Rp. {totalPrice}</p>
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
