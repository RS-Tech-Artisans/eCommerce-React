import React from 'react';
import './ProductCard.css';
import { ProductCardProps } from '../utils/Interfaces';
import { Link } from 'react-router-dom';

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

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={name} className="product-image" />
      </div>
      <Link to={`/catalog/product/${id}`} className="view-details-button">
        View Details
      </Link>

      <div className="product-content">
        <div className="product-details">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className="price-wrapper">
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
    </div>
  );
};

export default ProductCard;
