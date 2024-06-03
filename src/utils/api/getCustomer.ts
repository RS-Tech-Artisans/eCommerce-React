import { apiRoot } from './BuildClient';

export const fetchCustomerData = async () => {
  try {
    const response = await apiRoot.me().get().execute();

    if (!response.body) {
      throw new Error('Failed to fetch customer data');
    }

    return response.body;
  } catch (error) {
    console.error('Failed to fetch customer data:', error);
    throw error;
  }
};
