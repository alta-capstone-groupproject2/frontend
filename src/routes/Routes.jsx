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
import ListSubUmkm from '../pages/ListSubUmkm';
import DetailCulture from '../pages/Cultures/DetailCulture';

import { TokenContext } from '../utils/Context';
import Myevent from '../pages/Myevent';
import Applyevent from '../pages/Applyevent'
import Listsubmissionev from '../pages/Listsubmissionev';
import Detailsubmissionevent from '../pages/Detailsubmissionevent';
import UpgradeAccount from '../pages/UpgradeAccount';
import Listcultureadmin from '../pages/Listcultureadmin';
import Addcultures from '../pages/Addcultures';
import Editcultures from '../pages/Editcultures';
import Myproduct from '../pages/Myproduct';
import Addproduct from '../pages/Addproduct';
import Editproduct from '../pages/Editproduct';
import Joinedevent from '../pages/Joinedevent';
import Historyorder from '../pages/Historyorder';
import Cart from '../pages/Cart';
import Verification from '../pages/Verification';

const RoutesApp = () => {
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
  	const dispatch = useDispatch();
	const [token, setToken] = useState(null);
    const jwtToken = useMemo(() => ({ token, setToken }), [token]);
    
	useEffect(() => {
		const getToken = localStorage.getItem("token");
		if (getToken) {
			dispatch(reduxAction("IS_LOGGED_IN", true));
		} else {
			dispatch(reduxAction("IS_LOGGED_IN", false));
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
					<Route path='/upgrade-account' element={<UpgradeAccount />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/my-event' element={<Myevent />} />
					<Route path='/apply-event' element={<Applyevent />} />
					<Route path='/list-submission-umkm' element={<ListSubUmkm />} />
					<Route path='/list-culture-admin' element={<Listcultureadmin />} />
					<Route path='/add-culture' element={<Addcultures />} />
					<Route path='/edit-culture/:id' element={<Editcultures />} />
					<Route path='/list-submission-event' element={<Listsubmissionev />} />
					<Route path='/submission-event/:id' element={<Detailsubmissionevent />} />
					<Route path='/my-product' element={<Myproduct />} />
					<Route path='/add-product' element={<Addproduct />} />
					<Route path='/edit-product/:id' element={<Editproduct />} />
					<Route path='/joined-event' element={<Joinedevent />} />
					<Route path='/history-order' element={<Historyorder />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/verification/:id' element={<Verification />} />
					<Route path='*' element={<Custom404 />} />
				</Routes>
			</BrowserRouter>
		</TokenContext.Provider>
	);
};

export default RoutesApp;
