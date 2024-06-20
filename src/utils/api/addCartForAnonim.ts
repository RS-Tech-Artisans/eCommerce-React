import { apiRoot } from './BuildClient';

export const addCart = async () => {
  try {
    const response = await apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    console.error('Failed to add cart data:', error);
    throw error;
  }
};
