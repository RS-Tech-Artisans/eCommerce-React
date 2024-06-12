import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Basket.css';
import ClearCartButton from '../common/ClearCartButton';
import { useSession } from '../utils/SessionContext';
import { checkExistCart } from '../utils/api/checkExistCart';

const Basket: React.FC = () => {
  const { token } = useSession();
  const [cartExists, setCartExists] = useState<boolean>(false);
  const [checkCartApiResult, setCheckCartApiResult] = useState<void>();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartExists(savedCart.length > 0);
  }, []);

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartExists(false);
  };

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
          <div>CHECK EXIST CART:{JSON.stringify(checkCartApiResult)}</div>
          <div className="shopping-cart">
            <ClearCartButton onClearCart={clearCart} />
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
