import React from 'react';
import './SidebarFilters.css';
import {
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Button,
} from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { SidebarFiltersProps } from '../utils/Interfaces';
import { Category } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { getSearchFromAPI } from '../utils/api/getSearch';

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  search,
  setSearch,
  brandFilter,
  setBrandFilter,
  brands,
  displayFilter: displayFilter,
  setDisplayFilter: setDisplayFilter,
  displays,
  sizeFilter,
  setSizeFilter,
  sizes,
  priceFilter,
  setPriceFilter,
  handleResetFilters,
  setSortFilter,
  categories,
  setCategoryFilter,
}) => {
  const getCategoryPath = (category: Category) => {
    if (category.parent) {
      return `/category/${category.parent.id}/${category.id}`;
    } else {
      return `/category/${category.id}`;
    }
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter({ ...priceFilter, minPrice: e.target.value });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter({ ...priceFilter, maxPrice: e.target.value });
  };

  const handleBrandChange = (brand: string | null) => {
    setBrandFilter(brand);
  };

  const handleDisplayChange = (display: string | null) => {
    setDisplayFilter(display);
  };

  const handleSizeChange = (size: string | null) => {
    setSizeFilter(size);
  };

  const handleSortFilter = (sortAttribute: string | null) => {
    setSortFilter(sortAttribute);
  };

  const categoryFilter = (sortAttribute: string | null) => {
    setCategoryFilter(sortAttribute);
  };

  return (
    <div className="sidebar-filters">
      <Form className="filters">
        <div className="filter-categories">
          <h3 className="filter-header">Categories</h3>
          <ul className="category-list">
            {categories.map((category: Category) => (
              <li key={category.id} className="category-item">
                <Link
                  to={getCategoryPath(category)}
                  className="category-link"
                  onClick={() => categoryFilter(category.id)}
                >
                  {category.name['en-US'] || 'Unnamed Category'}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <InputGroup className="search-input-group">
          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>
          <Form.Control
            value={search}
            placeholder="Search"
            onChange={(e) => {setSearch(e.target.value); getSearchFromAPI(e.target.value, 0)}}
          />
        </InputGroup>

        <div>
          <Form.Select onChange={(e) => handleSortFilter(e.target.value)}>
            <option value={''}>Sort by</option>
            <option value={'price asc'} defaultValue={'low'}>
              Low price
            </option>
            <option value={'price desc'}>High price</option>
            <option value={'name.en-us asc'}>a-z</option>
            <option value={'name.en-us desc'}>z-a</option>
          </Form.Select>
        </div>

        <h3 className="filter-header">Filter by Price</h3>
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
        <h3 className="filter-header">Filter by Brand</h3>
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
        <h3 className="filter-header">Filter by Display Technology</h3>
        <DropdownButton
          id="filter-dropdown"
          title={displayFilter ? displayFilter : 'Select Display'}
          onSelect={handleDisplayChange}
          className="custom-dropdown"
        >
          <Dropdown.Item key="all-displays" eventKey="">
            all displays
          </Dropdown.Item>
          {displays.map((display) => (
            <Dropdown.Item key={display} eventKey={display}>
              {display}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <h3 className="filter-header">Filter by Size</h3>
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
