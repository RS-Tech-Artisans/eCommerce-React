import { apiRoot } from "./BuildClient";
import { ClientResponse } from "@commercetools/platform-sdk";

export const checkExistCart = async (token: string | null) => {
    if (!token) {
      console.log('cheakExistCarttoken !token', token);
      try {
        console.log('clear token');
        const ID = '7d8a4e2b-8418-48f5-ba83-b6afa0818363'
        const response: ClientResponse<void> = await apiRoot
        .carts()
        .withId({ID})
          .head()
          .execute();
  
        if (!response) {
          throw new Error('Failed to check exist cart');
        }
  
        const result = response.body;
  console.log(result)
        return result;
      } catch (error) {
        console.error('Failed to check exist cart:', error);
        throw error;
      }
    } else {
      console.log('checkExistCarttoken token', token);
      try {
     const ID = '7d8a4e2b-8418-48f5-ba83-b6afa0818363'
        const response: ClientResponse<void> = await apiRoot
        .carts()
        .withId({ID})
          .head()
          .execute();
  
        if (!response) {
          throw new Error('Failed to check exist cart ');
        }
  console.log(response)
        return response.body;
      } catch (error) {
        console.error('Failed to check exist cart data:', error);
        throw error;
      }
    }
  };
  