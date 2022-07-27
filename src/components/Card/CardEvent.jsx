/** @format */

const CardEvent = ({ name, city, image, onClickEvent }) => {
	return (
		<div id='card-event' className='bg-red-700 text-white flex flex-col rounded-md overflow-hidden hover:shadow-lg cursor-pointer' onClick={onClickEvent}>
			<div className="h-40 flex items-center bg-white">
				<img src={image} alt={name} className='h-full w-full object-contain' />
			</div>
			<div className='px-8 py-3 font-bold'>
				<h1 id='event-name'>{name}</h1>
				<p id='event-city-location'>{city}</p>
			</div>
		</div>
	);
};

export default CardEvent;
