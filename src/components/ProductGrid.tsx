import React from 'react';
import ProductCard from './ProductCard';
import { ProductInfo } from '../utils/Catalog';

interface ProductGridProps {
  products: ProductInfo[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div
      className="product-grid"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
    >
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            imageUrl={product.imageUrl}
            description={product.description}
            price={product.price}
          />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductGrid;
