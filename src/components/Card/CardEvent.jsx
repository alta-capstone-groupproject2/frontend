/** @format */

const CardEvent = ({ name, city, image, onClickEvent }) => {
	return (
		<div id='card-event' className='bg-red-700 text-white rounded-md overflow-hidden hover:shadow-md cursor-pointer' onClick={onClickEvent}>
			<img src={image} alt={name} className='w-full h-28' />
			<div className='px-8 py-3 font-bold'>
				<h1 id='event-name'>{name}</h1>
				<p id='event-city-location'>{city}</p>
			</div>
		</div>
	);
};

export default CardEvent;
