import { apiRoot } from './BuildClient';
import { Customer } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/platform-sdk';

export const UpdatePassword = async ( version: number,
  currentPassword:string,
  newPassword:string) => {
  const key = ['Qk8M_V7Off3i_-5_5zOAg-NFiU_WtAhlocLj9xozXOA'];
  try {
    const response: ClientResponse<Customer> = await apiRoot.me().password().post(
      {
        body: {
          version,
          currentPassword,
          newPassword
        },         
        headers: {key},
      }
    ).execute()

    if (!response.body) {
      console.error(response);
      console.error(Error);
    }

    return response.body;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};