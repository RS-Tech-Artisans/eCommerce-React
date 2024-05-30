import React, { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { ProductInfo } from '../utils/Interfaces';
//import { getFiltredProductsFromAPI } from '../utils/api/ProductsFilter';
//import { mapProducts } from '../utils/productMapper';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);

  const fetchData = async () => {
    try {
      // ! NEED FOR DEBUG
      //const filteredResponse = await getFiltredProductsFromAPI(0, 999999);
      //console.log('Filtered Products:', filteredResponse.results);
      //const productInfoArray = mapProducts(filteredResponse.results);
      //setProducts(productInfoArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="catalog">
      <ProductGrid products={products} setProducts={setProducts} />
    </div>
  );
};

export default Catalog;
