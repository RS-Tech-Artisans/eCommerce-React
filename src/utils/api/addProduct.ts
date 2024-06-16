import { apiRoot } from './BuildClient';

export const addProduct = async (
  idcart: string,
  version: number,
  product: string
) => {
  try {
    console.log('! ADD PRODUCT');
    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: idcart })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addLineItem',
              productId: product,
              variantId: 1,
            },
          ],
        },
      })
      .execute();

    return response.body.id;
  } catch (error) {
    console.error('Failed to add cart data:', error);
    throw error;
  }
};
