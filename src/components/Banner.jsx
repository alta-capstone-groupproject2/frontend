/** @format */

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TokenContext } from '../utils/Context';

const Banner = () => {
	const navigate = useNavigate();
	const { token } = useContext(TokenContext);
	return (
		<div className='bg-red-800 text-white p-12 space-y-4'>
			<div>
				<h1 className='text-2xl max-w-md pb-4'>Yuk kenali budayamu di Lami App dan peroleh keuntungan di Lami App.</h1>
				<q>Zaman boleh maju tapi budaya jangan ditinggalkan</q>
			</div>
			{token !== 0 ? (
				<button className='px-8 py-1 border border-white rounded-md hover:bg-white hover:text-red-800 hover:border-red-800' onClick={() => navigate('/signup')}>
					Sign Up
				</button>
			) : null}
		</div>
	);
};

export default Banner;
