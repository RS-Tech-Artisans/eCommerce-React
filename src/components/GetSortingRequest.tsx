import { useState, useEffect } from 'react';
import { apiRoot } from '../utils/api/getProjectInfo';

export const GetSorting = () => {
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
      .then((data) => data.results);
  };

  useEffect(() => {
    const fetchSortingData = async () => {
      if (sortAttribute) {
        const products = await getSortProduct();
        console.log('Fetched sorting Products:', products);
      }
    };
    fetchSortingData();
  }, [sortAttribute]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortAttribute(e.target.value);
  };

  return { sortAttribute, handleChange, getSortProduct };
};