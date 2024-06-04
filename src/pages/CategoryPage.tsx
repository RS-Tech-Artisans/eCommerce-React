import { useState } from 'react';
import { ProductInfo } from '../utils/Interfaces';
import ProductGrid from '../components/ProductGrid';

const CategoryPage: React.FC = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);

  return (
    <div className="catalog">
      <ProductGrid products={products} setProducts={setProducts} />
    </div>
  );
};

export default CategoryPage;
