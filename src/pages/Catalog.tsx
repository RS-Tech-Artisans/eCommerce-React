import React, { useEffect, useState } from 'react';
import {
  getProject,
  extractNamesAndPrices,
  ProductInfo,
} from '../utils/Catalog';
import ProductGrid from '../components/ProductGrid';
import { Sorting } from '../components/Sorting';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);

  useEffect(() => {
    getProject()
      .then((response) => {
        const productInfo = extractNamesAndPrices(response.results);
        setProducts(productInfo);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="catalog">
      <h1>Catalog page</h1>
      <Sorting />
      <ProductGrid products={products} />
    </div>
  );
};

export default Catalog;
