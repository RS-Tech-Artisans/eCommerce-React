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
import { getSizesFromAPI } from '../utils/api/getSizes';
import { getDisplaysFromAPI } from '../utils/api/getDisplays';

const ProductGrid: React.FC<ProductGridProps> = ({ products, setProducts }) => {
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [displays, setDisplays] = useState<string[]>([]);
  const [displayFilter, setDisplayFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [sortFilter, setSortFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<{
    minPrice: string;
    maxPrice: string;
  }>({
    minPrice: '',
    maxPrice: '',
  });

  //const colors = ['Grey', 'Black', 'White'];
  //const sizes = ['Small', 'Big'];

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

    const fetchSizes = async () => {
      try {
        const fetchedSizes = await getSizesFromAPI();
        setSizes(fetchedSizes);
      } catch (error) {
        console.error('Error fetching sizes:', error);
      }
    };

    fetchSizes();

    const fetchDisplays = async () => {
      try {
        const fetchedDisplays = await getDisplaysFromAPI();
        setDisplays(fetchedDisplays);
      } catch (error) {
        console.error('Error fetching Displays:', error);
      }
    };

    fetchDisplays();
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
        displayFilter || '',
        sizeFilter || '',
        sortFilter || ''
      );
      console.log('sortFilter: ', sortFilter);
      console.log('New Filtered Products:', filteredResponse.results);
      const productInfoArray = mapProducts(filteredResponse.results);
      setProducts(productInfoArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [priceFilter, brandFilter, displayFilter, sizeFilter, sortFilter]);

  const handleResetFilters = () => {
    setSearch('');
    setBrandFilter(null);
    setDisplayFilter(null);
    setSizeFilter(null);
    setSortFilter(null);
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
        displayFilter={displayFilter}
        setDisplayFilter={setDisplayFilter}
        displays={displays}
        sizeFilter={sizeFilter}
        setSizeFilter={setSizeFilter}
        sizes={sizes}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        setSortFilter={setSortFilter}
        handleResetFilters={handleResetFilters}
      />
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              id={product.id}
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
