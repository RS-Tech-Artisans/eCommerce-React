import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { ProductInfo } from '../utils/Interfaces';
//import { getFiltredProductsFromAPI } from '../utils/api/ProductsFilter';
//import { mapProducts } from '../utils/productMapper';

//const DEFAULT_CATEGORY =  'a8ffbf68-e7fd-4860-96d5-40deb9032836';
const Catalog: React.FC = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);

  // ! NEED FOR DEBUG
  // const fetchData = async () => {
  //   try {
  //     //const filteredResponse = await getFiltredProductsFromAPI(0, 999999);
  //     //console.log('Filtered Products:', filteredResponse.results);
  //     //const productInfoArray = mapProducts(filteredResponse.results);
  //     //setProducts(productInfoArray);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="catalog">
      <ProductGrid
        products={products}
        setProducts={setProducts}
        categoryID={undefined}
      />
    </div>
  );
};

export default Catalog;
