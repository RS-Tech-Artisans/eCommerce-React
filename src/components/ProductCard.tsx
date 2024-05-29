import React from 'react';
import './ProductCard.css';
import { ProductCardProps } from '../utils/Interfaces';

const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price / 100);
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  imageUrl,
  description,
  price,
}) => {
  const originalPrice = price.value.centAmount;
  const discountedPrice = price.discounted?.value.centAmount;
  const currency = price.value.currencyCode;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <div className="product-details">
        <h3>{name}</h3>
        <p>{description}</p>
        {discountedPrice ? (
          <div className="price">
            <span className="original-price">
              {formatPrice(originalPrice, currency)}
            </span>
            <span className="discounted-price">
              {formatPrice(discountedPrice, currency)}
            </span>
          </div>
        ) : (
          <div className="price">
            <span>{formatPrice(originalPrice, currency)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
