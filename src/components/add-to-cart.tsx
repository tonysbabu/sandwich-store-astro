/** @jsxImportSource react */
import { addItemToCart } from '../stores/cart';

type AddToCartType = {
	item: ShopItem;
};

export const AddToCart = ({ item }: AddToCartType) => {
	return (
		<button
			className="big-link"
			onClick={() => {
				console.log('item atc ', item);
				addItemToCart(item);
			}}
		>
			Add To Cart
		</button>
	);
};
