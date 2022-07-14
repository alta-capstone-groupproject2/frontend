/** @format */
import { useState,useMemo,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from '../pages/Homepage';
import Custom404 from '../pages/404';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Myevent from '../pages/events/Myevent';
import Applyevent from '../pages/events/Applyevent'

import { TokenContext } from "../utils/Context";

const RoutesApp = () => {
	const [token, setToken] = useState(null);
    const jwtToken = useMemo(() => ({ token, setToken }), [token]);
    
    useEffect(() => {
        const getToken = localStorage.getItem("token") || "0";
        setToken(getToken);
	}, [token]);
	
	return (
        <TokenContext.Provider value={jwtToken}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/myevent' element={<Myevent />} />
					<Route path='/applyevent' element={<Applyevent />} />
					<Route path='*' element={<Custom404 />} />
				</Routes>
			</BrowserRouter>
		</TokenContext.Provider>
	);
};

export default RoutesApp;
