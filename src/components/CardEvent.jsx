/** @format */

const CardEvent = ({ img, name, city, onClickEvent }) => {
	return (
		<div className='bg-red-700 rounded-md shadow-lg overflow-hidden' onClick={onClickEvent}>
			<img src={img} alt={name} />
			<div className='text-white px-6 py-2 cursor-pointer font-bold'>
				<h1>{name}</h1>
				<p>{city}</p>
			</div>
		</div>
	);
};

export default CardEvent;
