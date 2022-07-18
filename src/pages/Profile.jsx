/** @format */
import { useContext, useEffect, useState } from 'react';
import { FaEdit, FaStoreAlt } from 'react-icons/fa';

import { apiRequest } from '../utils/apiRequest';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../utils/Context';

const Profile = () => {
	const { token } = useContext(TokenContext);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [avatar, setAvatar] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');
	const [objSubmit, setObjSubmit] = useState('');

	const getProfile = () => {
		apiRequest('users', 'get', {}, { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
			.then((res) => {
				console.log(res);
				const { image, name, email, role } = res.data;
				setAvatar(image);
				setName(name);
				setEmail(email);
				setRole(role);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	const handleUpdate = (e) => {
		setLoading(true);
		e.preventDefault();
		const body = new FormData();
		for (const key in objSubmit) {
			body.append(key, objSubmit[key]);
		}
		apiRequest('users', 'PUT', body, { Authorization: `Bearer ${token}` })
			.then((res) => {
				const { message } = res;
				Swal.fire({
					title: 'Success',
					text: message,
					icon: 'success',
				});
			})
			.catch((err) => {
				console.log(err);
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
				apiRequest('users', 'DELETE', false, { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
					.then((res) => {
						Swal.fire({
							title: 'Deleted!',
							text: res.message,
							icon: 'success',
						});
					})
					.catch((err) => {
						console.log(err);
					})
					.finally(() => navigate('/login'));
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
				<div className='w-full flex flex-col sm:flex-row mt-12'>
					<Sidebar active='dashboard' />
					<div className='w-full flex flex-col p-8 space-y-16 lg:space-y-0'>
						<div className='flex flex-wrap justify-between'>
							<h1 className='font-bold text-2xl text-center sm:text-start pb-4'>Profile</h1>
							<div className='flex flex-col space-y-4'>
								{role === 'user' ? (
									<div>
										<h1 className='font-bold'>UMKM</h1>
										<button className='bg-red-700 px-6 py-2 rounded-sm hover:bg-red-800 text-white flex items-center' onClick={() => navigate(`/upgrade-account`)}>
											<FaStoreAlt className='mr-2' />
											<p className='font-bold'>Upgrade Account</p>
										</button>
									</div>
								) : null}
							</div>
						</div>
						<form onSubmit={(e) => handleUpdate(e)}>
							<div className='flex flex-col items-center space-y-8'>
								<div className='flex'>
									<img src={avatar} alt='avatar' width={100} height={100} className='rounded-full' />
									<div className='flex items-end ml-2'>
										<input
											type={'file'}
											accept={'image/*'}
											id={'upload_avatar'}
											className='hidden'
											onChange={(e) => {
												setAvatar(URL.createObjectURL(e.target.files[0]));
												handleChange(e.target.files[0], 'file');
											}}
										/>
										<label htmlFor={'upload_avatar'} className='text-center cursor-pointer'>
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
										<input type='email' name='name' id='email' placeholder={email} className='col-span-3 ml-4 pl-2 border focus:outline-none focus:ring-2 focus:ring-sky-400' onChange={(e) => handleChange(e.target.value, 'email')} />
									</div>
									<div className='grid grid-cols-4'>
										<label htmlFor='password' className='sm:text-xl text-end'>
											Password :
										</label>
										<input
											type='password'
											name='name'
											id='password'
											placeholder={'*****'}
											className='col-span-3 ml-4 pl-2 border focus:outline-none focus:ring-2 focus:ring-sky-400'
											onChange={(e) => handleChange(e.target.value, 'password')}
										/>
									</div>
								</div>
								<button className='py-2 px-16 rounded-md bg-red-700 text-white hover:bg-red-800'>Save</button>
							</div>
						</form>
						<div className='pt-8'>
							<button className='text-red-700 font-bold bg-white hover:bg-red-700 hover:text-white py-2 px-5 rounded-md shadow-lg border max-w-fit' onClick={() => handleDelete()}>
								Delete Account
							</button>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
};

export default Profile;
