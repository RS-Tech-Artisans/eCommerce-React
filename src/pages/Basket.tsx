import React from 'react';
import { Link } from 'react-router-dom';
import './Basket.css';

const Basket: React.FC = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const isEmptyCart = cart.length === 0;

  return (
    <div className="basket-container">
      {isEmptyCart ? (
        <div className="empty-cart-message">
          <p>Your shopping cart is empty. Start shopping now!</p>
          <p>
            Go to <Link to="/catalog">Product Catalog</Link>
          </p>
        </div>
      ) : (
        <h1>Basket</h1>
      )}
    </div>
  );
};

export default Basket;
