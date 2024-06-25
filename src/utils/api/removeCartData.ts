import {
  Cart,
  CartUpdateAction,
  ClientResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './BuildClient';

export const removeCartData = async (token: string | null) => {
  if (!token) {
    try {
      const cartResponse = await apiRoot.me().carts().get().execute();

      const lineItems = cartResponse.body.results[0].lineItems;
      const idCart = cartResponse.body.results[0].id;

      const removeActions: CartUpdateAction[] = lineItems.map((item) => ({
        action: 'removeLineItem',
        lineItemId: item.id,
      }));

      const response = await apiRoot
        .carts()
        .withId({ ID: idCart })
        .post({
          body: {
            version: cartResponse.body.results[0].version,
            actions: removeActions,
          },
        })
        .execute();

      return response.body;
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  } else {
    try {
      const responseWithToken: ClientResponse<Cart> = await apiRoot
        .me()
        .activeCart()
        .get()
        .execute();

      if (!responseWithToken.body) {
        throw new Error('Failed to fetch cart data');
      }

      const lineItems = responseWithToken.body.lineItems;
      const idCart = responseWithToken.body.id;

      const removeActions: CartUpdateAction[] = lineItems.map((item) => ({
        action: 'removeLineItem',
        lineItemId: item.id,
      }));

      const response = await apiRoot
        .carts()
        .withId({ ID: idCart })
        .post({
          body: {
            version: responseWithToken.body.version,
            actions: removeActions,
          },
        })
        .execute();

      return response.body;
    } catch (error) {
      console.error('Failed to fetch cart data:', error);
      throw error;
    }
  }
};
