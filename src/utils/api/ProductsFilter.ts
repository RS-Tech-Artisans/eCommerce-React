import { apiRoot } from './getProjectInfo';
import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

const DEFAULT_LIMIT = 500;
const DEFAULT_OFFSET = 0;

export const getFiltredProductsFromAPI = (
  minPrice: number,
  maxPrice: number,
  brandFilter: string | null,
  colorFilter: string | null,
  sizeFilter: string | null,
  limit = DEFAULT_LIMIT,
  offset = DEFAULT_OFFSET
): Promise<ProductProjectionPagedSearchResponse> => {
  const filterArr: string[] = [];
  filterArr.push(
    `variants.price.centAmount: range(${minPrice} to ${maxPrice})`
  );
  if (brandFilter) {
    filterArr.push(`variants.attributes.brand: "${brandFilter}"`);
  }
  if (colorFilter) {
    //filterArr.push(`variants.attributes.color-filter.key:"#964B00"`);
    filterArr.push(`variants.attributes.color.en-US: "${colorFilter}"`);
  }
  if (sizeFilter) {
    filterArr.push(`variants.attributes.size.en-US: "${sizeFilter}"`);
  }

  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: filterArr,
        limit,
        offset,
      },
    })
    .execute()
    .then((response) => response.body);
};
