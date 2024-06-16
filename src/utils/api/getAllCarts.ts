import { apiRoot } from './BuildClient';

export const getAllCarts = async () => {
  try {
    const response = await apiRoot
      .carts()
      .get({
        queryArgs: {
          limit: 300,
        },
      })
      .execute();
    return response.body.results;
  } catch (error) {
    console.error('Failed to fetch cart data:', error);
    throw error;
  }
};
