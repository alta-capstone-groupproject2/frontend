/** @format */

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from '../pages/Homepage';
import Custom404 from '../pages/404';
import Dashboard from '../pages/Dashboard';

const RoutesApp = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='*' element={<Custom404 />} />
			</Routes>
		</BrowserRouter>
	);
};

export default RoutesApp;
