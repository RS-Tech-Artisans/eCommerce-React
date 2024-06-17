import { Cart } from '@commercetools/platform-sdk';
import { fetchGetCartData } from './getLastCart';

export const getDiscount = async (token: string | null) => {
  try {
    const response: Cart = await fetchGetCartData(token);
    return response.discountOnTotalPrice?.discountedAmount.centAmount;
  } catch (error) {
    console.error('Failed to fetch cart data:', error);
    throw error;
  }
};
