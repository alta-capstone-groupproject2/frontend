/** @format */

const CardCulture = ({ name, city, image, onClickCulture }) => {
	return (
		<div id='card-culture' className='bg-red-700 text-white flex flex-col rounded-md overflow-hidden hover:shadow-lg cursor-pointer' onClick={onClickCulture}>
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

export default CardCulture;
