import React, { useState, useEffect } from 'react';
import './ProductCard.css';
import { ProductCardProps } from '../utils/Interfaces';
import { Link } from 'react-router-dom';
import { Cart } from '@commercetools/platform-sdk';
import { addProduct } from '../utils/api/addProduct';
import { fetchGetCartData } from '../utils/api/getLastCart';
import { useSession } from '../utils/SessionContext';
import { useCart } from '../utils/CartContext';

export const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price / 100);
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  imageUrl,
  description,
  price,
}) => {
  const originalPrice = price.value.centAmount;
  const discountedPrice = price.discounted?.value.centAmount;
  const currency = price.value.currencyCode;
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const { token } = useSession();
  const { setCartData } = useCart();

  // const checkCart = () => {
  //   const getSavedCart = localStorage.getItem('cartitems');
  //   if (getSavedCart) {
  //     const cart: Cart = JSON.parse(getSavedCart);
  //     const isItemInCart = cart.lineItems.some((item) => id === item.productId);
  //     setIsInCart(isItemInCart);
  //   }
  // }

  const checkProductState = () => {
    const cartData = JSON.parse(localStorage.getItem('cartitems') || '{}');
    const lineItems = cartData.lineItems || [];
    const foundItem = lineItems.find(
      (item: { productId: string }) => item.productId === id
    );

    if (foundItem) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  };

  useEffect(() => {
    //checkCart();
    checkProductState();
  }, [id]);

  const fetchCartFromApi = async () => {
    console.log('fetchCartFromApi');
    try {
      const response: Cart = await fetchGetCartData(token);
      console.log('get response fetchGetCartData', response);
      console.log('response.lineItems.length', response.lineItems.length);

      if (response) {
        setCartData(response);
      }

      localStorage.setItem('cartitems', JSON.stringify(response));
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const addToCart = async () => {
    const CartItems: Cart = JSON.parse(
      localStorage.getItem('cartitems') || '[]'
    );

    try {
      if (CartItems) {
        await addProduct(CartItems.id, CartItems.version, id);
        await fetchCartFromApi();
        setIsInCart(true);
        checkProductState();
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={name} className="product-image" />
      </div>
      <div className="buttons-card">
        <Link to={`/catalog/product/${id}`} className="view-details-button">
          View Details
        </Link>
        <button
          onClick={addToCart}
          className="add-to-cart-button"
          disabled={isInCart}
        >
          {isInCart ? 'In Cart' : 'Add to Cart'} 🛒
        </button>
      </div>

      <div className="product-content">
        <div className="product-details">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className="price-wrapper">
          {discountedPrice ? (
            <div className="prices">
              <span className="original-price">
                {formatPrice(originalPrice, currency)}
              </span>
              <span className="discounted-price">
                {formatPrice(discountedPrice, currency)}
              </span>
            </div>
          ) : (
            <div className="prices">
              <span>{formatPrice(originalPrice, currency)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
