import React, { useState, useEffect } from 'react';
import './ProductCard.css';
import { ProductCardProps } from '../utils/Interfaces';
import { Link } from 'react-router-dom';
import { useCart } from '../utils/CartContext';

export const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price / 100);
};

const SIZE_DESCRIPTION = 250;

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
  const { setCart } = useCart();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setIsInCart(cart.some((item: { id: string }) => item.id === id));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...cart, { id, name, price }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setIsInCart(true);
    setCart(updatedCart);
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={name} className="product-image" />
      </div>

      <div className="product-content">
        <div className="product-details">
          <h3 className="product-title">{name}</h3>

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

          <p>{truncateDescription(description, SIZE_DESCRIPTION)}</p>
        </div>
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
    </div>
  );
};

export default ProductCard;
