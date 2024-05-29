import { Price, ProductInfo } from './Interfaces';
import { apiRoot } from './getProjectInfo';
import {
  ProductPagedQueryResponse,
  Product,
} from '@commercetools/platform-sdk';

const DEFAULT_LIMIT = 500;
const DEFAULT_OFFSET = 0;

export const getProject = (
  limit: number = DEFAULT_LIMIT,
  offset: number = DEFAULT_OFFSET
): Promise<ProductPagedQueryResponse> => {
  return apiRoot
    .products()
    .get({ queryArgs: { limit, offset } })
    .execute()
    .then((response) => response.body);
};

export const extractNamesAndPrices = (products: Product[]): ProductInfo[] => {
  return products.map((product) => {
    const name =
      product.masterData.current.name['en-US'] || 'No name available';
    const imageUrl =
      (product.masterData.current.masterVariant.images ?? [])[0]?.url ||
      'No image available';
    const description =
      product.masterData.current.description?.['en-US'] ||
      'No description available';
    const priceArray = product.masterData.current.masterVariant.prices;
    const foundPrice = priceArray
      ? priceArray.find((p) => p.value.currencyCode === 'USD')
      : null;

    const productPrice: Price = foundPrice
      ? {
          value: {
            centAmount: foundPrice.value.centAmount,
            currencyCode: foundPrice.value.currencyCode,
          },
          discounted: foundPrice.discounted
            ? {
                value: {
                  centAmount: foundPrice.discounted.value.centAmount,
                  currencyCode: foundPrice.discounted.value.currencyCode,
                },
              }
            : undefined,
        }
      : {
          value: {
            centAmount: 0,
            currencyCode: 'USD',
          },
        };

    return { name, imageUrl, description, price: productPrice };
  });
};

getProject()
  .then((response) => {
    const products = (response as ProductPagedQueryResponse).results;
    console.log('products', products);
    const productInfo = extractNamesAndPrices(products);
    console.log('productInfo', productInfo);
  })
  .catch(console.error);

export { ProductInfo };
