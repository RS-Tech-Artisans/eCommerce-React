import React from 'react';
import { ProductInfo } from '../utils/Catalog';
import './ProductCard.css';

const ProductCard: React.FC<ProductInfo> = ({
  name,
  imageUrl,
  description,
  price,
}) => {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <img src={imageUrl} alt={name} />
      <p>{description}</p>
      <p>Price: ${price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
