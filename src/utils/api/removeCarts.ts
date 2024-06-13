import {
  Cart,
  CartUpdateAction,
  ClientResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './BuildClient';

export const removeCartData = async (
  token: string | null,
  idCart: string | undefined
) => {
  if (!token) {
    console.log('removeCartData !token');
    try {
      if (!idCart) {
        console.error('need to add idCard for removeCartData');
        return null;
      }

      const cartResponse = await apiRoot
        .me()
        .carts()
        //.withId({ ID: idCart })
        .get()
        .execute();

      //const lineItems = cartResponse.body.lineItems;
      const lineItems = cartResponse.body.results[0].lineItems;

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

      //console.log(JSON.stringify(response));
      //console.log('response2 cart ', response2.body.customerEmail);
      //console.log('response2 id cart ', response2.body.id);
      return response.body;
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  } else {
    console.log('removeCartData with token', token);
    try {
      if (!idCart) {
        console.error('need to add idCard for removeCartData');
        return null;
      }

      const responseWithToken: ClientResponse<Cart> = await apiRoot
        .me()
        .activeCart()
        .get()
        .execute();

      if (!responseWithToken.body) {
        throw new Error('Failed to fetch cart data');
      }

      const lineItems = responseWithToken.body.lineItems;

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
