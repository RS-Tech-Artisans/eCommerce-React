import { apiRoot } from './BuildClient';

export const addCart = async () => {
  console.log('! add cart');
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

    // console.log(JSON.stringify(response2));
    //console.log('response addCart id cart', response2.body.id);
    //console.log(' and length ', response2.body.lineItems.length);

    return response.body;
  } catch (error) {
    console.error('Failed to add cart data:', error);
    throw error;
  }
};
