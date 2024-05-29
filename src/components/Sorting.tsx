import { GetSorting } from './GetSortingRequest';

export const Sorting = () => {
  const { sortAttribute, handleChange } = GetSorting();

  return (
    <div>
      <select value={sortAttribute} onChange={handleChange}>
        <option value={''}>By default</option>
        <option value={'price asc'} defaultValue={'low'}>
          Low prise
        </option>
        <option value={'price desc'}>High price</option>
        <option value={'name.en-us asc'}>a-z</option>
        <option value={'name.en-us desc'}>z-a</option>
      </select>
    </div>
  );
};