import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { apiRoot } from './BuildClient';
import { addCart } from './addCartForAnonim';

export const fetchGetCartData = async (token: string | null) => {
  if (!token) {
    try {
      const response = await apiRoot.me().carts().get().execute();

      if (!response.body.results[0]) {
        const result = await addCart();
        return result;
      } else {
        const result = response.body.results[0]; // we have one cart for anonim user
        return result;
      }
    } catch (error) {
      console.error('Failed to fetch cart data:', error);
      throw error;
    }
  } else {
    try {
      const response: ClientResponse<Cart> = await apiRoot
        .me()
        .activeCart()
        .get()
        .execute();

      return response.body;
    } catch (error) {
      console.error('Failed to fetch cart data:', error);
      throw error;
    }
  }
};
