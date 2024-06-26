import { useEffect, useState } from 'react';
import { apiRoot } from './BuildClient';

export async function getPromocodes() {
  try {
    const response = await apiRoot.discountCodes().get().execute();
    const codes = response.body.results.map((item) => item.code);
    return codes;
  } catch (error) {
    console.error('err', error);
    throw error;
  }
}

export function usePromoCodes() {
  const [promoCodesList, setPromoCodesList] = useState<string[]>([]);

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const codes = await getPromocodes();
        setPromoCodesList(codes);
      } catch (error) {
        console.error('Failed to fetch promo codes:', error);
      }
    };

    fetchPromoCodes();
  }, []);

  return promoCodesList;
}
