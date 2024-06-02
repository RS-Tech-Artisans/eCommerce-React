import { apiRoot } from './getProjectInfo';
import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

const DEFAULT_LIMIT = 500;
const DEFAULT_OFFSET = 0;

export const getFiltredProductsFromAPI = (
  minPrice: number,
  maxPrice: number,
  brandFilter: string | null,
  displayFilter: string | null,
  sizeFilter: string | null,
  sortFilter: string | null,
  limit = DEFAULT_LIMIT,
  offset = DEFAULT_OFFSET
): Promise<ProductProjectionPagedSearchResponse> => {
  const filterArr: string[] = [];
  const sortArr: string[] = [];
  filterArr.push(
    `variants.price.centAmount: range(${minPrice} to ${maxPrice})`
  );
  if (brandFilter) {
    filterArr.push(`variants.attributes.brand: "${brandFilter}"`);
  }
  if (displayFilter) {
    //filterArr.push(`variants.attributes.color-filter.key:"#964B00"`);
    //filterArr.push(`variants.attributes.color.en-US: "${colorFilter}"`);
    filterArr.push(`variants.attributes.displaytechnology: "${displayFilter}"`);
  }
  if (sizeFilter) {
    filterArr.push(`variants.attributes.size: "${sizeFilter}"`);
  }

  if (sortFilter) {
    sortArr.push(`${sortFilter}`);
  }

  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: filterArr,
        sort: sortArr,
        limit,
        offset,
      },
    })
    .execute()
    .then((response) => response.body);
};
