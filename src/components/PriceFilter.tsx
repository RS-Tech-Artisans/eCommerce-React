import { ProductInfo } from '../utils/Interfaces';

export const filterProducts = (
  products: ProductInfo[],
  search: string,
  minPrice: string,
  maxPrice: string
): ProductInfo[] => {
  const minPriceInCents = minPrice === '' ? 0 : parseFloat(minPrice) * 100;
  const maxPriceInCents =
    maxPrice === '' ? 999999 * 100 : parseFloat(maxPrice) * 100;

  return products.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.price.value.centAmount >= minPriceInCents &&
      item.price.value.centAmount <= maxPriceInCents
    );
  });
};
