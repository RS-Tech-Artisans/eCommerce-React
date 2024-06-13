import { apiRoot } from './BuildClient';
import { ClientResponse, Cart } from '@commercetools/platform-sdk';

export const updateCartData = async (token: string | null, ID: string) => {
    if (!token) {
        console.log('updateCartDatatoken !token', token);
        try {
            console.log('clear token');
            //const ID = '7d8a4e2b-8418-48f5-ba83-b6afa0818363'
            const response: ClientResponse<Cart> = await apiRoot
                .carts()
                .withId({ ID })
                .post(
                    {
                        body: {
                            version: 21,
                            actions: [{
                                action: "addLineItem",
                                productId: "3e873c30-0d90-41ba-802a-eef9aae64eac",
                                quantity: 1
                            }]
                        }

                    })
                .execute();

            if (!response.body) {
                throw new Error('Failed to update cart data');
            }

            const result = response.body;

            return result;
        } catch (error) {
            console.error('Failed to update cart data:', error);
            throw error;
        }
    } else {
        console.log('updateCartDatatoken token', token);
        try {
            //const ID = '7d8a4e2b-8418-48f5-ba83-b6afa0818363'
            const response: ClientResponse<Cart> = await apiRoot
                .carts()
                .withId({ ID })
                .post(
                    {
                        body: {
                            version: 21,
                            actions: [{
                                action: "addLineItem",
                                productId: "3e873c30-0d90-41ba-802a-eef9aae64eac",
                                variantId: 1,
                                quantity: 1
                            }]
                        }



                    })
                .execute();

            if (!response.body) {
                throw new Error('Failed to send cart data');
            }

            return response.body;
        } catch (error) {
            console.error('Failed to send cart data:', error);
            throw error;
        }
    }
};

