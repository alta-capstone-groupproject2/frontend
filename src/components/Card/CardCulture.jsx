/** @format */

const CardCulture = ({ name, city, image, onClickCulture }) => {
	return (
		<div className='bg-red-700 text-white rounded-md overflow-hidden hover:shadow-md cursor-pointer' onClick={onClickCulture}>
			<img src={image} alt={name} />
			<div className='px-8 py-3 font-bold'>
				<h1>{name}</h1>
				<p>{city}</p>
			</div>
		</div>
	);
};

export default CardCulture;
