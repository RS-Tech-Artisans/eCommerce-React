import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import './PriceFilter.css';
import './DropdownButtonStyles.css';
import SidebarFilters from './SidebarFilters';
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
    <div className="product-grid-container">
      <SidebarFilters
        search={search}
        setSearch={setSearch}
        brandFilter={brandFilter}
        setBrandFilter={setBrandFilter}
        brands={brands}
        colorFilter={colorFilter}
        setColorFilter={setColorFilter}
        colors={colors}
        sizeFilter={sizeFilter}
        setSizeFilter={setSizeFilter}
        sizes={sizes}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        handleResetFilters={handleResetFilters}
      />
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
