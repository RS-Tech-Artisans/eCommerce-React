import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Basket.css';
import { getDiscountAPI } from '../utils/api/getDiscountApi';
import { Cart } from '@commercetools/platform-sdk';

const Basket: React.FC = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const isEmptyCart = cart.length === 0;

  const [promoCode, setPromoCode] = useState('');

  //здесь мне нужно будет для теста уже созданную Cart из реализации пункта 02
  //const [cartData, setCartData] = useState<Cart | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // getDiscountAPI(promoCode, cartData);
  };

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
        <div>
          <h1>Basket</h1>
          <h2>Promo is: QLED-TV</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="promocode">Promocode:</label>
            <input
              type="text"
              id="promocode"
              value={promoCode}
              onChange={(e): void => setPromoCode(e.target.value)}
            />
            <input type="submit" value="Apply" />
          </form>
          <span>Price with discount: </span>
        </div>
      )}
    </div>
  );
};

export default Basket;
