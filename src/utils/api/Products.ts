// import { apiRoot } from './getProjectInfo';
// import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';

// const DEFAULT_LIMIT = 500;
// const DEFAULT_OFFSET = 0;

// export const getProductsFromAPI = (
//   limit = DEFAULT_LIMIT,
//   offset = DEFAULT_OFFSET
// ): Promise<ProductPagedQueryResponse> => {
//   return apiRoot
//     .products()
//     .get({ queryArgs: { limit, offset } })
//     .execute()
//     .then((response) => response.body);
// };
