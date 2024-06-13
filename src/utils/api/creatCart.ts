import { apiRoot } from './BuildClient';
import { ClientResponse, Cart } from '@commercetools/platform-sdk';

export const creatCartData = async (token: string | null) => {
  if (!token) {
    console.log('creatCartDatatoken !token', token);
    try {
      console.log('clear token');
      const response: ClientResponse<Cart> = await apiRoot
        .carts()
        .post({
          body: {
            currency: 'USD',
          },
        })
        .execute();

      if (!response.body) {
        throw new Error('Failed to creat cart');
      }
      const result = response.body;
      return result;
    } catch (error) {
      console.error('Failed to creat cart:', error);
      throw error;
    }
  } else {
    console.log('creatCarttoken token', token);
    try {
      const response: ClientResponse<Cart> = await apiRoot
        .carts()
        .post({
          body: {
            currency: 'USD',
          },
        })
        .execute();

      if (!response.body) {
        throw new Error('Failed to creat cart');
      }
      return response.body;
    } catch (error) {
      console.error('Failed to creat cart:', error);
      throw error;
    }
  }
};
