import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import { Form, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { ProductGridProps } from '../utils/Interfaces';

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    return search
      ? products.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      : products;
  }, [search, products]);

  return (
    <div>
      <Form>
        <InputGroup className="search-input-group">
          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>
          <Form.Control
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Form>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
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
