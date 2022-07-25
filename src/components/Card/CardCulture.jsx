/** @format */

const CardCulture = ({ name, city, image, onClickCulture }) => {
	return (
		<div id='card-culture' className='bg-red-700 text-white rounded-md overflow-hidden hover:shadow-md cursor-pointer' onClick={onClickCulture}>
			<img src={image} alt={name} className='w-full' />
			<div className='px-8 py-3 font-bold'>
				<h1 id='culture-name'>{name}</h1>
				<p id='culture-location-city'>{city}</p>
			</div>
		</div>
	);
};

export default CardCulture;
