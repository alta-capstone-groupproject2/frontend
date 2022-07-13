/** @format */

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundAnimation from '../assets/animation/404-error-page.json';

export default function Custom404() {
	const navigate = useNavigate();
	const timer = 5000;
	const second = 1000;
	const [countdown, setCountdown] = useState(timer);

	if (countdown > 0) {
		setTimeout(() => {
			setCountdown(countdown - second);
		}, second);
	} else {
		clearInterval(countdown);
	}

	useEffect(() => {
		setTimeout(() => {
			navigate('/');
		}, timer);
	});

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<div className='flex flex-col items-center justify-center'>
				<Lottie autoPlay loop={true} animationData={NotFoundAnimation} className='w-1/2' />
				<h1 className='text-xl'>
					You will be redirect to homepage in <span className='font-semibold'>{countdown / second}</span> sec
				</h1>
			</div>
		</div>
	);
}
