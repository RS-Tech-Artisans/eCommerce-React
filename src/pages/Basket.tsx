import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Basket.css';
import ClearCartButton from '../common/ClearCartButton';
import { useSession } from '../utils/SessionContext';
import { checkExistCart } from '../utils/api/checkExistCart';
import { creatCartData } from '../utils/api/creatCart';
import { updateCartData } from '../utils/api/updateCart';
import { Cart } from '@commercetools/platform-sdk';

const Basket: React.FC = () => {
  const { token } = useSession();
  const [cartExists, setCartExists] = useState<boolean>(false);
  const [checkCartApiResult, setCheckCartApiResult] = useState<void>();
  const [creatNewCart, setCreatNewCart] = useState<Cart>();
  const [updateCart, setUpdateCart] = useState<Cart>();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartExists(savedCart.length > 0);
  }, []);

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartExists(false);
  };

  useEffect(() => {
    const creatCart = async () => {
      try {
        const response: Cart = await creatCartData(token);
        if (response) setCreatNewCart(response);
      } catch (error) {
        console.error('Error sending cart data:', error);
      }
    };

    creatCart();
  }, []);

  useEffect(() => {
    const checkCart = async () => {
      try {
        const response: void = await checkExistCart(token);
        if (response !== undefined) setCheckCartApiResult(response);
      } catch (error) {
        console.error('Error checking exist cart:', error);
      }
    };

    checkCart();
  }, []);


  useEffect(() => {
    const updateCartItems = async () => {
      try {
        const response: Cart = await updateCartData(token, '7d8a4e2b-8418-48f5-ba83-b6afa0818363');
        if (response) setUpdateCart(response);
      } catch (error) {
        console.error('Error updating cart data:', error);
      }
    };

    updateCartItems();

  }, []);




  return (
    <div className="basket-container">
      {!cartExists ? (
        <div className="empty-cart-message">
          <p>Your shopping cart is empty. Start shopping now!</p>
          <p>
            Go to <Link to="/catalog">Product Catalog</Link>
          </p>
        </div>
      ) : (
        <>
          <h1>Basket</h1>
          <div>Creat Cart Id === {creatNewCart?.id}</div>
          <div>
            Check exist Cart ==={' '}
            {JSON.stringify(checkCartApiResult) === '{}' &&
              'SUCCESSFUL CART CHECK RESULT'}
          </div>
          <div>Update Cart Id === {JSON.stringify(updateCart)}</div>
          <div className="shopping-cart">
            <ClearCartButton onClearCart={clearCart} />
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
