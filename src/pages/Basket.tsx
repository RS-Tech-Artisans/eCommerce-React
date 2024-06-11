import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Basket.css';
import ClearCartButton from '../common/ClearCartButton';

const Basket: React.FC = () => {
  const [cartExists, setCartExists] = useState<boolean>(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartExists(savedCart.length > 0);
  }, []);

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartExists(false);
  };

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
          <div className="shopping-cart">
            <ClearCartButton onClearCart={clearCart} />
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
