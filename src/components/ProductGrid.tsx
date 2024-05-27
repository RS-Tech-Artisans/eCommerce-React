import React from 'react';
import ProductCard from './ProductCard';
import { ProductInfo } from '../utils/Catalog';
import './ProductGrid.css'; // Import the CSS file
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
interface ProductGridProps {
  products: ProductInfo[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [search, setSearch] = useState('');

  const filteredProducts = search
    ? products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div>
      <Form action="">
        <InputGroup style={{ width: '30%' }}>
          <span className="search-icon">
            <BsSearch />
          </span>
          <Form.Control
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          ></Form.Control>
        </InputGroup>
      </Form>
      <div className="product-grid">
        {filteredProducts.length > 0 && products.length > 0 ? (
          filteredProducts.map((product) => (
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
    </div>
  );
};

export default ProductGrid;
