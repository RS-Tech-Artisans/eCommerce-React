import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import './PriceFilter.css';

interface PriceFilterProps {
  onFilterChange: (filter: { minPrice: number; maxPrice: number }) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const filter = {
        minPrice: parseFloat(minPrice) || 0,
        maxPrice: parseFloat(maxPrice) || Infinity,
      };
      onFilterChange(filter);
    }, 500);
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, onFilterChange]);

  return (
    <Form className="price-filter-form">
      <h3 className="price-filter-header">Price Filter</h3>
      <Row>
        <Col>
          <Form.Group controlId="minPrice">
            <Form.Control
              className="price-filter-input"
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="maxPrice">
            <Form.Control
              className="price-filter-input"
              type="number"
              placeholder={`3599`}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default PriceFilter;
