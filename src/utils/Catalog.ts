import { apiRoot } from './getProjectInfo';
import {
  ProductPagedQueryResponse,
  Product,
} from '@commercetools/platform-sdk';

export interface ProductInfo {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

type ApiResponseType = ProductPagedQueryResponse;

export const getProject = (): Promise<ApiResponseType> => {
  return apiRoot
    .products()
    .get()
    .execute()
    .then((response) => response.body);
};

console.log('Catalog');

//getProject().then(console.log).catch(console.error);

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
    const productPrice = priceArray
      ? (priceArray.find((price) => price.value.currencyCode === 'USD')?.value
          .centAmount || 0) / 100
      : 0;
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
