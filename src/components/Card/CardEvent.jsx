/** @format */

const CardEvent = ({ name, city, image, onClickEvent }) => {
	return (
		<div className='bg-red-700 text-white rounded-md overflow-hidden hover:shadow-md cursor-pointer' onClick={onClickEvent}>
			<img src={image} alt={name} className='w-60 h-28' />
			<div className='px-8 py-3 font-bold'>
				<h1>{name}</h1>
				<p>{city}</p>
			</div>
		</div>
	);
};

export default CardEvent;
