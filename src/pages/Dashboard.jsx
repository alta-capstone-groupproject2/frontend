/** @format */
import { useEffect, useState } from 'react';
import { FaEdit, FaStoreAlt } from 'react-icons/fa';

import { apiRequest } from '../utils/apiRequest';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';
import { BiStore } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [avatar, setAvatar] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');
	const [store,setStore] = useState("")
    const [owner,setOwner] = useState("")
    const [phone,setPhone] = useState("")
    const [city,setCity] = useState("")
    const [doc,setDoc] = useState("")
    const [address,setAddress] = useState("")
    const [status,setStatus] = useState("")
	const [objSubmit, setObjSubmit] = useState('');

	const getProfile = () => {
		apiRequest('users', 'get', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
			.then((res) => {
				setAvatar(res.data.image);
				setName(res.data.name);
				setEmail(res.data.email);
				setRole(res.data.role)
				setStore(res.data.storeName)
				setOwner(res.data.owner)
				setPhone(res.data.phone)
				setCity(res.data.city)
				setStatus(res.data.status)
				setDoc(res.data.document)
				setAddress(res.data.address)
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		const body = new FormData();
		for (const key in objSubmit) {
			body.append(key, objSubmit[key]);
			console.log(key,objSubmit[key])
		}
		apiRequest('users', 'put', body, {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		})
			.then((res) => {
				const { code, message } = res;
				switch (code) {
					case '200':
						Swal.fire(`Success`, message, 'success')
						break;
					case '400': Swal.fire(`Failed`,message,'error'); break;
					default: Swal.fire(`Code ${code}`,message,'info'); break;
				}
			})
			.catch((err) => {
				const errorMsg = err.message
				let msg
				if (err.response.data) msg = err.response.data.message 
				Swal.fire(errorMsg,msg,'error'); 
			})
			.finally(() => getProfile());
	};

	const handleDelete = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((res) => {
			if (res.isConfirmed) {
				apiRequest('users', 'DELETE', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` })
					.then((res) => {
						const { code, message } = res;
						if (code === 200) {
							navigate('/login');
							Swal.fire({
								title: 'Deleted!',
								text: message,
								icon: 'success',
							});
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
	};

	const handleChange = (value, key) => {
		let temp = { ...objSubmit };
		temp[key] = value;
		setObjSubmit(temp);
	};

	useEffect(() => {
		getProfile();
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<Layout>
				<div className='w-full flex flex-col sm:flex-row mt-12 min-h-[80vh]'>
					<Sidebar active='dashboard' />
					<div className='w-full flex flex-col space-y-16 lg:space-y-0'>
						<form onSubmit={(e) => handleUpdate(e)} className="flex justify-between">
							<div className='flex flex-col items-center space-y-8 basis-1/2'>
								<p className='font-bold text-lg self-start'>Profile</p>
								<div className='flex'>
									<img id='user-avatar' src={avatar} alt='avatar' width={100} height={100} className='rounded-full' />
									<div className='flex items-end ml-2'>
										<input
											type='file'
											accept='image/*'
											id='upload_avatar'
											className='hidden'
											onChange={(e) => {
												setAvatar(URL.createObjectURL(e.target.files[0]));
												handleChange(e.target.files[0], 'image');
											}}
										/>
										<label htmlFor='upload_avatar' className='text-center cursor-pointer'>
											<FaEdit />
										</label>
									</div>
								</div>
								<div className='flex flex-col space-y-4'>
									<div className='grid grid-cols-4'>
										<label htmlFor='name' className='sm:text-xl text-end'>
											Name :
										</label>
										<input type='text' name='name' id='name' placeholder={name} className='col-span-3 ml-4 pl-2 border focus:outline-none focus:ring-2 focus:ring-sky-400' onChange={(e) => handleChange(e.target.value, 'name')} />
									</div>
									<div className='grid grid-cols-4'>
										<label htmlFor='email' className='sm:text-xl text-end'>
											Email :
										</label>
										<input type='email' name='email' id='email' placeholder={email} className='col-span-3 ml-4 pl-2 border focus:outline-none focus:ring-2 focus:ring-sky-400' onChange={(e) => handleChange(e.target.value, 'email')} />
									</div>
									<div className='grid grid-cols-4'>
										<label htmlFor='password' className='sm:text-xl text-end'>
											Password :
										</label>
										<input
											type='password'
											name='password'
											id='password'
											placeholder={'*****'}
											className='col-span-3 ml-4 pl-2 border focus:outline-none focus:ring-2 focus:ring-sky-400'
											onChange={(e) => handleChange(e.target.value, 'password')}
										/>
									</div>
								</div>
								<button className='py-2 px-16 rounded-md bg-red-700 text-white hover:bg-red-800' type='submit'>Save</button>
							</div>
							<div className='flex flex-col space-y-4 basis-1/2'>
								{role === 'user' && status ==='' ? (
									<div className='pr-8'>
										<p className='font-bold text-lg'>UMKM</p>
										<button className='bg-red-700 px-6 py-2 rounded-sm hover:bg-red-800 text-white flex items-center' onClick={() => navigate(`/upgrade-account`)}>
											<FaStoreAlt className='mr-2' />
											<p className='font-bold'>Upgrade Account</p>
										</button>
									</div>
								) : (
									<div className='pr-8'>
										<p className='font-bold text-lg'>UMKM</p>
										<div className='flex gap-4 items-center mt-4'>
											<BiStore className='text-9xl' />
											<div>
												<p className='font-bold text-4xl'>{store}</p>
												<p >{owner}</p>	
												<p >
													<a href={`https://api.WhatsApp.com/send?phone=${phone}`} className="underline text-red-600" target='_blank' rel="noreferrer">{phone}</a>
												</p>	
												<p >{city}</p>	
												<p >{address}</p>	
												<p >
													Doc : <a href={`${doc}`} target='_blank' className="break-all underline text-red-600" rel="noreferrer">{doc}</a>
												</p>	
												<p className='flex mt-4'>
													<span className='text-xs rounded border-2 border-red-600 text-red-600 px-2 text-center'>
														Submission Status : {status}
													</span>
												</p>	
											</div>	
										</div>	
									</div>
								)}
							</div>
						</form>
						<div className='pt-8'>
							<button id='btn-delete-account' className='text-red-700 font-bold bg-white hover:bg-slate-100 active:bg-slate-200 py-2 px-5 rounded-md shadow-lg border max-w-fit' onClick={() => handleDelete()}>
								Delete Account
							</button>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
};

export default Dashboard;
