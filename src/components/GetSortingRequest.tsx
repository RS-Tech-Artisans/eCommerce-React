import { useState, useEffect } from 'react';
import { apiRoot } from '../utils/api/getProjectInfo';
import { mapProducts } from '../utils/productMapper';
import { ProductInfo } from '../utils/Interfaces';

export const GetSorting = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [sortAttribute, setSortAttribute] = useState('');

  const getSortProduct = async () => {
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: 500,
          sort: [sortAttribute],
        },
      })
      .execute()
      .then((response) => response.body)
  };

  useEffect(() => {
    const fetchSortingData = async () => {
      if (sortAttribute) {
        const fetchProducts = await getSortProduct();
        console.log('Fetched sorting Products:', fetchProducts);
        const productInfoArray = mapProducts(fetchProducts.results);
        setProducts(productInfoArray);
      }
    };
    fetchSortingData();
  }, [sortAttribute]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortAttribute(e.target.value);
  };

  return { sortAttribute, handleChange, getSortProduct };
};