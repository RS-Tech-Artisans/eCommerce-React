import {
  Cart,
  CartUpdateAction,
  ClientResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './BuildClient';

export const updateQuantityItem = async (
  token: string | null,
  itemId: string,
  count: number
) => {
  if (!token) {
    console.log('updateQuantityItem !token');
    try {
      const cartResponse = await apiRoot.me().carts().get().execute();

      const idCart = cartResponse.body.results[0].id;
      const updateAction: CartUpdateAction = {
        action: 'changeLineItemQuantity',
        lineItemId: itemId,
        quantity: count,
      };

      const response = await apiRoot
        .carts()
        .withId({ ID: idCart })
        .post({
          body: {
            version: cartResponse.body.results[0].version,
            actions: [updateAction],
          },
        })
        .execute();

      return response.body;
    } catch (error) {
      console.error('Failed to clear Product From Cart without token:', error);
      throw error;
    }
  } else {
    console.log('updateQuantityItem with token', token);
    try {
      const responseWithToken: ClientResponse<Cart> = await apiRoot
        .me()
        .activeCart()
        .get()
        .execute();

      const idCart = responseWithToken.body.id;

      const updateAction: CartUpdateAction = {
        action: 'changeLineItemQuantity',
        lineItemId: itemId,
        quantity: count,
      };

      const response = await apiRoot
        .carts()
        .withId({ ID: idCart })
        .post({
          body: {
            version: responseWithToken.body.version,
            actions: [updateAction],
          },
        })
        .execute();

      return response.body;
    } catch (error) {
      console.error('Failed to clear Product From Cart with token:', error);
      throw error;
    }
  }
};
