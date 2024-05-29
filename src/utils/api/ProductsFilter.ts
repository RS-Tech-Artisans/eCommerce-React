import { apiRoot } from './getProjectInfo';
import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

const DEFAULT_LIMIT = 500;
const DEFAULT_OFFSET = 0;

export const getFiltredProductsFromAPI = (
  minPrice: number,
  maxPrice: number,
  filterStr: string = `variants.price.centAmount: range(${minPrice} to ${maxPrice})`,
  limit = DEFAULT_LIMIT,
  offset = DEFAULT_OFFSET
): Promise<ProductProjectionPagedSearchResponse> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: filterStr,
        limit,
        offset,
      },
    })
    .execute()
    .then((response) => response.body);
};
