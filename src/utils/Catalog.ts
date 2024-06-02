// import { Product } from '@commercetools/platform-sdk';
// import { Price, ProductInfo } from './Interfaces';

// export const extractNamesAndPrices = (products: Product[]): ProductInfo[] => {
//   return products.map((product) => {
//     const name =
//       product.masterData.current.name['en-US'] || 'No name available';
//     const imageUrl =
//       (product.masterData.current.masterVariant.images ?? [])[0]?.url ||
//       'No image available';
//     const description =
//       product.masterData.current.description?.['en-US'] ||
//       'No description available';
//     const priceArray = product.masterData.current.masterVariant.prices;
//     const foundPrice = priceArray
//       ? priceArray.find((p) => p.value.currencyCode === 'USD')
//       : null;

//     const productPrice: Price = foundPrice
//       ? {
//           value: {
//             centAmount: foundPrice.value.centAmount,
//             currencyCode: foundPrice.value.currencyCode,
//           },
//           discounted: foundPrice.discounted
//             ? {
//                 value: {
//                   centAmount: foundPrice.discounted.value.centAmount,
//                   currencyCode: foundPrice.discounted.value.currencyCode,
//                 },
//               }
//             : undefined,
//         }
//       : {
//           value: {
//             centAmount: 0,
//             currencyCode: 'USD',
//           },
//         };

//     const discountedPrice =
//       productPrice.discounted?.value.centAmount ||
//       productPrice.value.centAmount;

//     return {
//       name,
//       imageUrl,
//       description,
//       price: productPrice,
//       discountedPrice,
//     };
//   });
// };

// // export const fetchProductInfo = async () => {
// //   try {
// //     const response = await getProductsFromAPI();
// //     const products = response.results;
// //     const productInfo = extractNamesAndPrices(products);
// //     return productInfo;
// //   } catch (error) {
// //     console.error(error);
// //     return [];
// //   }
// // };
