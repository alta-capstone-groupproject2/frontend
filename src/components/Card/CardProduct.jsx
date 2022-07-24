/** @format */

const CardProduct = ({ name, price, image, onClickProduct }) => {
	return (
		<div id='card-product' className='bg-white text-red-700 rounded-md overflow-hidden hover:shadow-md cursor-pointer' onClick={onClickProduct}>
			<img src={image} alt={name} className='w-full h-28' />
			<div className='font-bold px-8 py-3'>
				<h1 id='product-name'>{name}</h1>
				<p id='product-price'>Rp. {price}</p>
			</div>
		</div>
	);
};

export default CardProduct;
