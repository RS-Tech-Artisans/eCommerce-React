import { useState } from 'react';
import { apiRoot } from '../utils/getProjectInfo';

export const Sorting = () => {
  const [sortAttribute, setSortAttribute] = useState('');
  console.log(sortAttribute);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortAttribute(e.target.value);
  };

  return (
    <div>
      <select defaultValue="default" onChange={handleChange}>
        <option value={'default'}>By default</option>
        <option value={'ascending'} defaultValue={'low'}>
          Low prise
        </option>
        <option value={'descending'}>High price</option>
        <option value={'alphabetically'}>a-z</option>
        <option value={'reverse-alphabetically'}>z-a</option>
      </select>
    </div>
  );
};

const getSortProduct = () => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        sort: ['price asc', 'price desc', 'name.us asc', 'name.us desc'],
      },
    })
    .execute()
    .then((response) => response.body);
};

getSortProduct()
  .then((response) => {
    console.log(`this ${response.results}`);
  })
  .catch(console.error);

/*  switch (sortAttribute){
    case: 'ascending':
      order: 'price asc';
      break;
    case: 'descending':
      order: 'price desc';
      break;
    case: 'alphabetically':
      order: 'name.de asc';
      break;
    case: 'reverse-alphabetically':
      order: 'name.de asc';
      break;
    default;} */

/* data.sort((a,b)=> {
  if(a>b)return 1;
  if(a<b)return -1;
  return 0;
}) */
