import React from 'react';
import {
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Button,
} from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { SidebarFiltersProps } from '../utils/Interfaces';

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  search,
  setSearch,
  brandFilter,
  setBrandFilter,
  brands,
  colorFilter,
  setColorFilter,
  colors,
  sizeFilter,
  setSizeFilter,
  sizes,
  priceFilter,
  setPriceFilter,
  handleResetFilters,
}) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter({ ...priceFilter, minPrice: e.target.value });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter({ ...priceFilter, maxPrice: e.target.value });
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

  return (
    <div className="sidebar-filters">
      <Form className="filters">
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
        <h4 className="filter-header">Filter by Price</h4>
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
        <h4 className="filter-header">Filter by Brand</h4>
        <DropdownButton
          id="brand-filter-dropdown"
          title={brandFilter ? brandFilter : 'Select Brand'}
          onSelect={handleBrandChange}
          className="custom-dropdown"
        >
          <Dropdown.Item key="no-brand" eventKey="">
            all brands
          </Dropdown.Item>

          {brands.map((brand) => (
            <Dropdown.Item key={brand} eventKey={brand}>
              {brand}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <h4 className="filter-header">Filter by Color</h4>
        <DropdownButton
          id="filter-dropdown"
          title={colorFilter ? colorFilter : 'Select Color'}
          onSelect={handleColorChange}
          className="custom-dropdown"
        >
          <Dropdown.Item key="no-color" eventKey="">
            all colors
          </Dropdown.Item>
          {colors.map((color) => (
            <Dropdown.Item key={color} eventKey={color}>
              {color}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <h4 className="filter-header">Filter by Size</h4>
        <DropdownButton
          id="size-filter-dropdown"
          title={sizeFilter ? sizeFilter : 'Select Size'}
          onSelect={handleSizeChange}
          className="custom-dropdown"
        >
          <Dropdown.Item key="no-size" eventKey="">
            all sizes
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
    </div>
  );
};

export default SidebarFilters;
