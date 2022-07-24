/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react'
import { Modal } from '@mui/material'
import HorizontalLinearStepper from '../components/Stepper'
import { FaTimes } from 'react-icons/fa'
import srcLogo from '../assets/images/logo.webp'
import { apiRequest } from '../utils/apiRequest'
import { FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import axios from 'axios'
import CurrencyFormat from 'react-currency-format'
import { OpenStreetMapProvider } from 'leaflet-geosearch';

function Cart() {
    
    const provider = new OpenStreetMapProvider();
    const callSearch = async (input) => {
        const results = await provider.search({ query: input });
        return results
    }
    const [searchMap,setSearchMap]=useState([])
    const [inputAddress, setInputAddress] = useState('')

    const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [cart, setCart] = useState([]);
	const [totalPrice, setTotalPrice] = useState();
	const [cartsID, setCartID] = useState([]);
	const [name, setName] = useState('');
    const [city, setCity] = useState('');
    
    const [stepper, setStepper] = useState(false)
    const [address, setAddress] = useState('')
    const [bank, setBank] = useState('')
    const [receiver, setReceiver] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(true)
    const [loadApi, setLoadApi] = useState(false)
    const [paymentCode,setPaymentCode] = useState('')
    
    const showStepper = () => setStepper(true)

    const closeStepper = () => {
        setAddress('')
        setBank('')
        setReceiver('')
        setPhone('')
        setStepper(false)
    }

    const apiPost = () => {
        setLoadApi(true)
        const body = {
            'cart_id': cartsID,
            'address': address,
            'phone': phone,
            'receiver':receiver
        }
        apiRequest(`orders/${bank}`, 'post', JSON.stringify(body), {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        })
        .then((res) => {
            const { OrderID } = res
            setPaymentCode(OrderID)
        })
        .catch((err) => {
            const errorMsg = err.message
            let msg
            if (err.response.data) msg = err.response.data.message 
            alert(`${errorMsg} : ${msg}`);
            
        })
        .finally(() => setLoadApi(false));
    };

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
                const cartIdList = getAllCartID(data)
                const total = getTotalPrice(data)
                setTotalPrice(total)
                setCartID(cartIdList)
                setCart(data);
			})
			.catch((err) => {
				console.log(err);
            }).finally(() => {
                setLoading(false)
            })
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

    const getAllCartID = (datas) => {
		let temp = [];
		datas.map((item) => item.cartID && temp.push(item.cartID));
		return temp
	};

	const getTotalPrice = (carts) => {
		let total = 0;
		carts.forEach((item) => {
			total += item.price * item.qty;
		});
		return total;
	};

    const handleChange = (e, type) => {
        const val = e.target.value
        const obj = {
            'name':(val)=>setName(val),
            'city':(val)=>setCity(val),
        }
        obj[type](val)
    };

    useEffect(() => {
		getCart();
	}, []);
    
    const handleChangePayment = (e, type) => {
        const val = e
        const obj = {
            'bank': (value) => setBank(value),
            'receiver': (value) => setReceiver(value.target.value),
            'address': (value) =>  setAddress(value),
            'inputAddress': (value) => {
                setInputAddress(value);
                callSearch(value).then((e) => setSearchMap(e))
            },
            'phone': (value) => setPhone(value.target.value),
        }
        setError(false)
        obj[type](val)
    }

    const handleSubmitPayment = () => {
        let passed = 0
        bank !== "" && passed++
        receiver !== "" && passed++
        address !== "" && passed++
        phone !== "" && passed++

        if (passed === 4) {
            setPhone(`62${phone}`)
            return true
        } else { return false }
    }

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
							<input type='submit' id='search-product' className='hidden' onClick={() => navigate(`/merchandise?name=${name}&city=${city}`)} />
						</div>
					</div>
				</div>
				<div className=''>
					{cart.map((item) => {
						return (
							<div className='grid grid-cols-1 gap-y-4 sm:gap-y-0 border sm:border-0 sm:grid-cols-12 hover:bg-slate-100 hover:rounded-md hover:shadow-sm p-6 cursor-default' key={item.cartID}>
								<div className='col-span-2 flex items-center justify-center'>
									<img id='product-image' src={item.image} alt={item.name} />
								</div>
								<div className='col-span-3 flex justify-center'>
									<div className='space-y-2'>
										<p id='product-name' className='text-lg font-bold'>{item.name}</p>
                                        <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp. '} />
									</div>
								</div>
								<div className='col-span-3 flex justify-center'>
									<div className='text-center'>
										<p className='text-lg font-bold'>Qty</p>
										<p id='product-qty'>{item.qty}</p>
									</div>
								</div>
								<div className='col-span-3'>
									<div className='space-y-2 text-center'>
										<p className='text-lg font-bold'>Subtotal</p>
                                        <CurrencyFormat value={item.price*item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp. '} />
									</div>
								</div>
								<button id='delete-cart' className='flex justify-center self-center' onClick={() => deleteCart(item.cartID)}>
									<FaTrash className='font-bold text-xl text-red-600 hover:text-red-700 active:text-red-800' />
								</button>
							</div>
						);
					})}
				</div>
				<div className='p-12'>
					<div className='flex flex-col items-end space-y-4'>
						<p id='total-price' className='text-center font-bold flex gap-2'>
                            Total Price : 
                            <CurrencyFormat className='font-bold' value={totalPrice} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp. '} />
						</p>
						<button id='order-cart' onClick={() => showStepper()} className='py-1 px-5 rounded text-white bg-red-600 hover:bg-red-700 active:bg-red-800'>
							Payment
                        </button>
                        <Modal
                            open={stepper}
                            onClose={(_, reason) => {
                                if (reason !== "backdropClick") {
                                closeStepper();
                                }
                            }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div className='absolute rounded p-6 pt-8 bg-white w-1/2 top-[10%] left-1/4 flex flex-col'>
                                <div className='flex justify-between mb-6 items-center'>
                                    <img src={ srcLogo} alt="" className='w-20 self-center'/>
                                    <button className='text-2xl text-gray-300 hover:text-gray-400' onClick={()=>closeStepper()}><FaTimes /></button>
                                </div>
                                <HorizontalLinearStepper
                                    handleSubmitPayment={handleSubmitPayment}
                                    loadApi={loadApi}
                                    handleChangePayment={handleChangePayment}
                                    bank={bank}
                                    address={address}
                                    phone={phone}
                                    receiver={receiver}
                                    error={error}
                                    setError={setError}
                                    apiPost={apiPost}
                                    cart={cart}
                                    totalPrice={totalPrice}
                                    searchMap={searchMap}
                                    inputAddress={inputAddress}
                                    paymentCode={paymentCode}
                                />
                            </div>
                        </Modal>
					</div>
				</div>
			</Layout>
		);
	}
}

export default Cart
