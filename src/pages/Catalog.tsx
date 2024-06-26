import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { ProductInfo } from '../utils/Interfaces';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);

  return (
    <div className="catalog">
      <ProductGrid
        products={products}
        setProducts={setProducts}
        catID={undefined}
      />
    </div>
  );
};

export default Catalog;
