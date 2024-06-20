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
import { getCategoriesFromAPI } from '../utils/api/getCategories';
import { Cart, Category } from '@commercetools/platform-sdk';
import { useSession } from '../utils/SessionContext';
import { fetchGetCartData } from '../utils/api/getLastCart';

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  setProducts,
  catID,
}) => {
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [displays, setDisplays] = useState<string[]>([]);
  const [displayFilter, setDisplayFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [sortFilter, setSortFilter] = useState<string | null>(null);
  const [categoryId, setCategoryFilter] = useState<string | undefined>(catID);
  const [priceFilter, setPriceFilter] = useState<{
    minPrice: string;
    maxPrice: string;
  }>({
    minPrice: '',
    maxPrice: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  // const [cartItems, setCartItems] = useState<Cart | null>(null);

  const [loadedLimitProductsCount, setLoadedProductsCount] = useState(0);

  const COUNT_PRODUCT = 8;
  const { token } = useSession();

  const getCategories = async () => {
    try {
      const fetchedCategories = await getCategoriesFromAPI();
      setCategories(fetchedCategories.results);
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const fetchedBrands = await getBrandsFromAPI();
      setBrands(fetchedBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchSizes = async () => {
    try {
      const fetchedSizes = await getSizesFromAPI();
      setSizes(fetchedSizes);
    } catch (error) {
      console.error('Error fetching sizes:', error);
    }
  };

  const fetchDisplays = async () => {
    try {
      const fetchedDisplays = await getDisplaysFromAPI();
      setDisplays(fetchedDisplays);
    } catch (error) {
      console.error('Error fetching Displays:', error);
    }
  };

  const fetchCartFromApi = async () => {
    try {
      const response: Cart = await fetchGetCartData(token);
      if (response) {
        localStorage.setItem('cartitems', JSON.stringify(response));
        //  setCartItems(response);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    getCategories();
    fetchBrands();
    fetchSizes();
    fetchDisplays();
  }, []);

  useEffect(() => {
    fetchCartFromApi();
  }, [token]);

  const loadMoreProducts = () => {
    if (loadedLimitProductsCount != COUNT_PRODUCT * 2)
      setLoadedProductsCount(loadedLimitProductsCount + COUNT_PRODUCT); // need fixed if we have more 16 products
  };

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
        sortFilter || '',
        categoryId || '',
        loadedLimitProductsCount + COUNT_PRODUCT
      );
      const productInfoArray = mapProducts(filteredResponse.results);
      setProducts(productInfoArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [
    priceFilter,
    brandFilter,
    displayFilter,
    sizeFilter,
    sortFilter,
    categoryId,
    loadedLimitProductsCount,
  ]);

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

  window.addEventListener('scroll', () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom && filteredProducts.length + 50 > loadedLimitProductsCount) {
      loadMoreProducts();
    }
  });

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
        categories={categories}
        setCategoryFilter={setCategoryFilter}
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
