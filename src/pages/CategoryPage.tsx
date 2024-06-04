import { useEffect, useState } from 'react';
import { ProductInfo } from '../utils/Interfaces';
import ProductGrid from '../components/ProductGrid';

const CategoryPage: React.FC = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [categoryid, setID] = useState<string>();

  useEffect(() => {
    let category = location.pathname.split('/').pop();

    setID(category);
  }, [location]);

  return (
    <div className="catalog">
      <ProductGrid
        products={products}
        setProducts={setProducts}
        categoryID={categoryid}
      />
    </div>
  );
};

export default CategoryPage;
