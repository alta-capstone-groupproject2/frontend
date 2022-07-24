/** @format */

const CardProduct = ({ name, price, image, onClickProduct }) => {
	return (
		<div className='bg-white text-red-700 rounded-md overflow-hidden shadow-md hover:shadow-xl cursor-pointer flex flex-col' onClick={onClickProduct}>
			<img src={image} alt={name} className='w-full self-center' />
			<div className='font-bold px-8 py-3 border-t-[0.05rem] border-slate-200'>
				<h1>{name}</h1>
				<p>Rp. {price}</p>
			</div>
		</div>
	);
};

export default CardProduct;
