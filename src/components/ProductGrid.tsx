import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import './PriceFilter.css';
import { Form, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { ProductGridProps } from '../utils/Interfaces';
import { mapProducts } from '../utils/productMapper';
import { getFiltredProductsFromAPI } from '../utils/api/ProductsFilter';
import { filterProducts } from './PriceFilter';

const ProductGrid: React.FC<ProductGridProps> = ({ products, setProducts }) => {
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState<{
    minPrice: string;
    maxPrice: string;
  }>({
    minPrice: '',
    maxPrice: '',
  });

  const fetchFilteredProducts = async () => {
    try {
      const minPriceInCents =
        priceFilter.minPrice === ''
          ? 0
          : parseFloat(priceFilter.minPrice) * 100;
      const maxPriceInCents =
        priceFilter.maxPrice === ''
          ? 999999 * 100
          : parseFloat(priceFilter.maxPrice) * 100;
      const filteredResponse = await getFiltredProductsFromAPI(
        minPriceInCents,
        maxPriceInCents
      );
      console.log('New Filtered Products:', filteredResponse.results);
      const productInfoArray = mapProducts(filteredResponse.results);
      setProducts(productInfoArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [priceFilter]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter((prevState) => ({
      ...prevState,
      maxPrice: e.target.value,
    }));
  };

  const filteredProducts = useMemo(() => {
    return filterProducts(
      products,
      search,
      priceFilter.minPrice,
      priceFilter.maxPrice
    );
  }, [search, products, priceFilter]);

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
        <h4 className="price-filter-header">Filter by Price</h4>
        <InputGroup className="price-filter-input-group">
          <Form.Control
            type="number"
            value={priceFilter.minPrice}
            placeholder="0"
            onChange={handleMinPriceChange}
          />
          <Form.Control
            type="number"
            value={priceFilter.maxPrice}
            placeholder="999999"
            onChange={handleMaxPriceChange}
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
