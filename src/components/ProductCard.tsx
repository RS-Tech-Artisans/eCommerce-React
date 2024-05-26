import React from 'react';

export interface ProductCardProps {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  imageUrl,
  description,
  price,
}) => {
  return (
    <div
      className="product-card"
      style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
        width: '300px',
        margin: '10px',
      }}
    >
      <h3>{name}</h3>
      <img
        src={imageUrl}
        alt={name}
        style={{ width: '250px', height: '250px', margin: '0 auto' }}
      />
      <p>{description}</p>
      <p>Price: ${price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
