import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import './PriceFilter.css';
import './DropdownButtonStyles.css';
import {
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Button,
} from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { ProductGridProps } from '../utils/Interfaces';
import { mapProducts } from '../utils/productMapper';
import { getFiltredProductsFromAPI } from '../utils/api/ProductsFilter';
import { filterProducts } from './PriceFilter';
import { getBrandsFromAPI } from '../utils/api/getBrands';

const ProductGrid: React.FC<ProductGridProps> = ({ products, setProducts }) => {
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<{
    minPrice: string;
    maxPrice: string;
  }>({
    minPrice: '',
    maxPrice: '',
  });

  const colors = ['Grey', 'Black', 'White'];
  const sizes = ['Small', 'Big'];

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const fetchedBrands = await getBrandsFromAPI();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

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
        maxPriceInCents,
        brandFilter || '',
        colorFilter || '',
        sizeFilter || ''
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
  }, [priceFilter, brandFilter, colorFilter, sizeFilter]);

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

  const handleBrandChange = (brand: string | null) => {
    setBrandFilter(brand);
  };

  const handleColorChange = (color: string | null) => {
    setColorFilter(color);
  };

  const handleSizeChange = (size: string | null) => {
    setSizeFilter(size);
  };

  const handleResetFilters = () => {
    setSearch('');
    setBrandFilter(null);
    setColorFilter(null);
    setSizeFilter(null);
    setPriceFilter({ minPrice: '', maxPrice: '' });
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
        <h4 className="price-filter-header">Filter by Brand</h4>
        <DropdownButton
          id="brand-filter-dropdown"
          title={brandFilter ? brandFilter : 'Select Brand'}
          onSelect={handleBrandChange}
          className="custom-dropdown"
        >
          <Dropdown.Item key="no-brand" eventKey="">
            no brand
          </Dropdown.Item>

          {brands.map((brand) => (
            <Dropdown.Item key={brand} eventKey={brand}>
              {brand}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <h4 className="price-filter-header">Filter by Color</h4>
        <DropdownButton
          id="filter-dropdown"
          title={colorFilter ? colorFilter : 'Select Color'}
          onSelect={handleColorChange}
          className="custom-dropdown"
        >
          <Dropdown.Item key="no-color" eventKey="">
            no color
          </Dropdown.Item>
          {colors.map((color) => (
            <Dropdown.Item key={color} eventKey={color}>
              {color}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <h4 className="price-filter-header">Filter by Size</h4>
        <DropdownButton
          id="size-filter-dropdown"
          title={sizeFilter ? sizeFilter : 'Select Size'}
          onSelect={handleSizeChange}
          className="custom-dropdown"
        >
          <Dropdown.Item key="no-size" eventKey="">
            no size
          </Dropdown.Item>
          {sizes.map((size) => (
            <Dropdown.Item key={size} eventKey={size}>
              {size}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <Button
          onClick={handleResetFilters}
          variant="secondary"
          className="reset-filters-button"
        >
          Reset Filters
        </Button>
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
