import { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from './BuildClient';

export const getDiscountAPI = async (promoCode: string, cartData: Cart) => {
  try {
    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: cartData.id })
      .post({
        body: {
          version: cartData.version,
          actions: [{ action: 'addDiscountCode', code: promoCode }],
        },
      })
      .execute();
    return response.body;
  } catch (error) {
    console.error(`discount ${promoCode} not founded`, error);
    return [];
  }
};
