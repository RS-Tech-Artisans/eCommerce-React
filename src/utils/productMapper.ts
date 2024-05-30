import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductInfo } from '../utils/Interfaces';

export const mapProducts = (products: ProductProjection[]): ProductInfo[] => {
  return products.map((product: ProductProjection) => {
    const name = product.name['en-US'] || 'No name available';
    const imageUrl =
      (product.masterVariant.images ?? [])[0]?.url || 'No image available';
    const description =
      product.description?.['en-US'] || 'No description available';
    const price = {
      value: {
        centAmount: product.masterVariant.prices?.[0]?.value?.centAmount ?? 0,
        currencyCode:
          product.masterVariant.prices?.[0]?.value?.currencyCode ?? 'USD',
      },
      discounted: {
        value: {
          centAmount:
            product.masterVariant.prices?.[0]?.discounted?.value?.centAmount ??
            0,
          currencyCode:
            product.masterVariant.prices?.[0]?.discounted?.value
              ?.currencyCode ?? 'USD',
        },
      },
    };
    const discountedPrice =
      price.discounted?.value?.centAmount || price.value?.centAmount;
    return { name, imageUrl, description, price, discountedPrice };
  });
};
