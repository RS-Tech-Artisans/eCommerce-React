import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../utils/api/getProjectInfo';

export const GetSorting = () => {
  const [sortAttribute, setSortAttribute] = useState('');
  const [responseData, setResponseData] = useState<ProductProjection[]>([]);
  console.log(`response is ${responseData}`);

  const getSortProduct = async () => {
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: [sortAttribute],
        },
      })
      .execute()
      .then((response) => response.body);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (sortAttribute) {
        const response = await getSortProduct();
        setResponseData(response.results);
        console.log(`this ${response.results}`);
      }
    };
    fetchData();
  }, [sortAttribute]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortAttribute(e.target.value);
  };

  return { sortAttribute, handleChange, getSortProduct };
};
