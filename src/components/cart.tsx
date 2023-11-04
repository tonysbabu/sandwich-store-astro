import styles from './cart.module.css';
import {
	cart,
	addItemToCart,
	removeItemFromCart,
	subTotal,
} from '../stores/cart';
import { useStore } from '@nanostores/solid';
import { createSignal, Show } from 'solid-js';

function formatCurrency(price) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price);
}

export const EmptyState = () => {
	return (
		<>
			<p class={styles.icon}>
				<span role="img" aria-label="sandwich">
					🥪
				</span>
			</p>
			<p class={styles.empty}>Your Cart is empty. Add a sandwich or two</p>
		</>
	);
};

export const CheckoutNotice = () => {
	return <p class={styles.notice}>Checkout is not implemented yet</p>;
};

export const Cart = () => {
	const [showCheckoutNotice, setShowCheckoutNotice] = createSignal(false);

	const $cart = useStore(cart);
	const $subtotal = useStore(subTotal);

	console.log('cart ', $subtotal, $cart);

	return (
		<aside class={styles.cart}>
			<h2>Your Cart</h2>
			<Show when={Object.values($cart()).length > 0} fallback={<EmptyState />}>
				<ul class={styles.items}>
					{Object.values($cart()).map((entry: CartItem) => (
						<li class={styles.item}>
							<span class={styles.quantity}>{entry.quantity}</span>
							<span class={styles.name}>{entry.item.title}</span>
							<span class={styles.remove}>
								<button onClick={() => removeItemFromCart(entry.item.id)}>
									&times;
								</button>
							</span>
							<span class={styles.price}>{entry.item.price}</span>
						</li>
					))}
				</ul>
				<div class={styles.details}>
					<p class={styles.subtotal}>
						<span class={styles.label}>Subtotal:</span>{' '}
						{formatCurrency($subtotal())}
					</p>
					<p class={styles.shipping}>
						<span class={styles.label}>Shipping:</span> <del>$10</del>
						<ins>FREE</ins>
					</p>
					<p class={styles.total}>
						<span class={styles.label}>Total:</span>{' '}
						{formatCurrency($subtotal())}
					</p>
					<p class={styles.checkout}>
						<button
							class="big-link"
							onClick={() => setShowCheckoutNotice(true)}
						>
							Checkout
						</button>
					</p>
					<Show when={showCheckoutNotice()}>
						<CheckoutNotice />
					</Show>
				</div>
			</Show>
		</aside>
	);
};
