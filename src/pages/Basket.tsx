import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Basket.css';
import { useSession } from '../utils/SessionContext';
import { Cart } from '@commercetools/platform-sdk';
import { fetchGetCartData } from '../utils/api/getLastCart';
import { addProduct } from '../utils/api/addProduct';
import { removeCartData } from '../utils/api/removeCarts';
import ClearCartButton from '../common/ClearCartButton';

const Basket: React.FC = () => {
  const [cartItems, setCartItems] = useState<Cart | null>(null);
  const [cartId, setCartId] = useState<string>();
  const { token } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCartFromApi = async () => {
    console.log('fetchCartFromApi');
    try {
      const response: Cart = await fetchGetCartData(token);
      console.log('get response fetchGetCartData', response);
      console.log('response.lineItems.length', response.lineItems.length);
      setCartId(response.id);
      if (response) {
        if (response.lineItems.length === 0) {
          await addProduct(
            response.id,
            response.version,
            '02a7b7d0-8e7b-4841-9171-986d1ff8df93'
          );
        }
      }

      const response2: Cart = await fetchGetCartData(token);
      localStorage.setItem('cartitems', JSON.stringify(response2));

      // const savedCart = JSON.parse(localStorage.getItem('cartitems') || '{}');
      // setCartItems(savedCart);
      setCartItems(response2);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartitems') || '{}');
    console.log('savedCart: ', savedCart, typeof savedCart);
    if (savedCart && Object.keys(savedCart).length > 0) {
      setCartItems(savedCart);
      setIsLoading(false);
    } else {
      fetchCartFromApi();
    }
    //setCartExists(savedCart.length > 0);
  }, [token]);

  const clearCart = async () => {
    try {
      const resultRemoveCartData = await removeCartData(token, cartId);
      if (resultRemoveCartData) {
        localStorage.removeItem('cartitems');
        setCartItems(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const renderCartItem = (item: Cart) => {
    return (
      <ul>
        <li>version: {item.version} </li>
        <li> anonymousId: {item.anonymousId} </li>
        <li> customerId: {item.customerId} </li>
        <li> id: {item.id}</li>
        <li>
          {' '}
          totalPrice: {item.totalPrice?.centAmount / 100}{' '}
          {item.totalPrice?.currencyCode} {item.cartState}{' '}
        </li>
        {<li> lineItems.length: {item.lineItems.length}</li>}
      </ul>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="basket-container">
      {!cartItems ? (
        <div className="empty-cart-message">
          <p>Your shopping cart is empty. Start shopping now!</p>
          <p>
            Go to <Link to="/catalog">Product Catalog</Link>
          </p>
        </div>
      ) : (
        <>
          <h1>Basket</h1>
          <div>
            <ul>{renderCartItem(cartItems)}</ul>
          </div>
          <div className="shopping-cart">
            {<ClearCartButton onClearCart={clearCart} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
