import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import { Form, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { ProductGridProps } from '../utils/Interfaces';
import PriceFilter from './PriceFilter';

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState<{
    minPrice: number;
    maxPrice: number;
  }>({ minPrice: 0, maxPrice: Infinity });

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const minPriceInCents = priceFilter.minPrice * 100; // 1 dollar = 100 cents
      const maxPriceInCents = priceFilter.maxPrice * 100;
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        item.price.value.centAmount >= minPriceInCents &&
        item.price.value.centAmount <= maxPriceInCents
      );
    });
  }, [search, products, priceFilter]);

  const handlePriceFilterChange = (filter: {
    minPrice: number;
    maxPrice: number;
  }) => {
    setPriceFilter(filter);
  };

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
      <PriceFilter onFilterChange={handlePriceFilterChange} />
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
