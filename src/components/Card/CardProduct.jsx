/** @format */
import CurrencyFormat from 'react-currency-format';
const CardProduct = ({ name, price, image, onClickProduct }) => {
	return (
		<div id='card-product' className='bg-red-700 text-white flex flex-col rounded-md overflow-hidden hover:shadow-lg cursor-pointer' onClick={onClickProduct}>
			<div className="h-40 flex items-center bg-white">
				<img src={image} alt={name} className='h-full w-full object-contain' />
			</div>
			<div className='px-8 py-3 font-bold'>
				<h1 id='event-name'>{name}</h1>
				<CurrencyFormat value={price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp. '} />
			</div>
		</div>
	);
};

export default CardProduct;
