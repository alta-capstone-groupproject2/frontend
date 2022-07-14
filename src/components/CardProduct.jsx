/** @format */

const CardProduct = ({ img, name, price, onClickMerchandise }) => {
	return (
		<div className='bg-white rounded-md shadow-lg overflow-hidden' onClick={onClickMerchandise}>
			<img src={img} alt={name} />
			<div className='text-red-700 px-6 py-2 cursor-pointer font-bold'>
				<h1>{name}</h1>
				<p>{price}</p>
			</div>
		</div>
	);
};

export default CardProduct;
