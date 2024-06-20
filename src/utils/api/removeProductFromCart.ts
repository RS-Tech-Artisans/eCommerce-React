import {
  Cart,
  CartUpdateAction,
  ClientResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './BuildClient';

export const removeProductFromCart = async (
  token: string | null,
  itemId: string
) => {
  if (!token) {
    try {
      const cartResponse = await apiRoot.me().carts().get().execute();

      const idCart = cartResponse.body.results[0].id;
      const removeAction: CartUpdateAction = {
        action: 'removeLineItem',
        lineItemId: itemId,
      };

      const response = await apiRoot
        .carts()
        .withId({ ID: idCart })
        .post({
          body: {
            version: cartResponse.body.results[0].version,
            actions: [removeAction],
          },
        })
        .execute();

      return response.body;
    } catch (error) {
      console.error('Failed to clear Product From Cart without token:', error);
      throw error;
    }
  } else {
    try {
      const responseWithToken: ClientResponse<Cart> = await apiRoot
        .me()
        .activeCart()
        .get()
        .execute();

      const idCart = responseWithToken.body.id;

      const removeAction: CartUpdateAction = {
        action: 'removeLineItem',
        lineItemId: itemId,
      };

      const response = await apiRoot
        .carts()
        .withId({ ID: idCart })
        .post({
          body: {
            version: responseWithToken.body.version,
            actions: [removeAction],
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
