/** @format */

import { useNavigate } from 'react-router-dom';
import bannerImg from '../assets/images/HP-KK-01-BANNERP1-RUANG-KREATIF-1.jpg'

const Banner = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	return (
		<div className='bg-red-700 flex max-h-[60vh] relative'>
			<div className='text-white p-12 space-y-4 cursor-default basis-1/2 flex justify-center flex-col'>
				<div>
					<h1 className='text-4xl font-extrabold pb-4'>Yuk kenali budayamu di Lami App dan peroleh keuntungan di Lami App.</h1>
					<q className='font-thin text-lg'>Zaman boleh maju tapi budaya jangan ditinggalkan</q>
				</div>
				{token ? null : (
					<button id='btn-signup' className='self-start px-8 py-1 border border-white rounded hover:bg-white hover:text-red-800 hover:border-red-800' onClick={() => navigate('/signup')}>
						Sign Up
					</button>)}
			</div>
			<div className='overflow-clip basis-1/2'>
				<div className='xl:bg-gradient-to-r xl:from-red-700 w-[20%] absolute bottom-0 xl:top-0 z-10 h-[50%] xl:h-full'></div>
				<img src={bannerImg} alt="" />
			</div>
		</div>
	);
}
export default Banner;
