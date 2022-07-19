/* eslint-disable react-hooks/exhaustive-deps */
/** @format */
import { useState,useMemo,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reduxAction } from "../utils/redux/actions/action";

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
import Myevent from '../pages/Myevent';
import Applyevent from '../pages/Applyevent'
import Listsubmissionev from '../pages/Listsubmissionev';
import Detailsubmissionevent from '../pages/Detailsubmissionevent';

const RoutesApp = () => {
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
  	const dispatch = useDispatch();
	const [token, setToken] = useState(null);
    const jwtToken = useMemo(() => ({ token, setToken }), [token]);
    
	useEffect(() => {
		const getToken = localStorage.getItem("token");
		const getRole = localStorage.getItem("role");
		if (getToken && getRole) {
			dispatch(reduxAction("IS_LOGGED_IN", true));
			dispatch(reduxAction("ROLE", getRole));
		} else {
			dispatch(reduxAction("IS_LOGGED_IN", false));
			dispatch(reduxAction("ROLE", ''));
		}
	}, [isLoggedIn]);
	
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
					<Route path='/profile' element={<Dashboard />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/myevent' element={<Myevent />} />
					<Route path='/apply-event' element={<Applyevent />} />
					<Route path='/list-submission-event' element={<Listsubmissionev />} />
					<Route path='/submission-event/:id' element={<Detailsubmissionevent />} />
					<Route path='*' element={<Custom404 />} />
				</Routes>
			</BrowserRouter>
		</TokenContext.Provider>
	);
};

export default RoutesApp;
