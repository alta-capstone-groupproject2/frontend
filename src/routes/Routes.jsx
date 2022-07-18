/** @format */
import { useState,useMemo,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from '../pages/Homepage';
import Custom404 from '../pages/404';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Dashboard from '../pages/Dashboard';
import Events from '../pages/Events/Events';
import DetailEvent from '../pages/Events/DetailEvent';
import Cultures from '../pages/Cultures/Cultures';
import DetailCulture from '../pages/Cultures/DetailCulture';

import { TokenContext } from '../utils/Context';

const RoutesApp = () => {
	const [token, setToken] = useState(null);
	const jwtToken = useMemo(() => ({ token, setToken }), [token]);

	useEffect(() => {
		const getToken = localStorage.getItem('token') || '0';
		setToken(getToken);
	}, [token]);

	return (
		<TokenContext.Provider value={jwtToken}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/events' element={<Events />} />
					<Route path='/event/:eventID' element={<DetailEvent />} />
					<Route path='/cultures' element={<Cultures />} />
					<Route path='/culture/:cultureID' element={<DetailCulture />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='*' element={<Custom404 />} />
				</Routes>
			</BrowserRouter>
		</TokenContext.Provider>
	);
};

export default RoutesApp;
