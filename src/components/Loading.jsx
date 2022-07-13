/** @format */

import Lottie from 'lottie-react';

import LoadingAnimation from '../assets/animation/petruk-wind-wheel.json';

export default function Loading() {
	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<Lottie autoPlay loop={true} animationData={LoadingAnimation} className='w-1/2 h-1/2' />
		</div>
	);
}
