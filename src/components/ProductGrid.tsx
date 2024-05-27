import React from 'react';
import ProductCard from './ProductCard';
import { ProductInfo } from '../utils/Catalog';
import './ProductGrid.css'; // Import the CSS file

interface ProductGridProps {
  products: ProductInfo[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="product-grid">
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
