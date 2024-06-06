
/*
import { useState } from 'react';
import {
  ClientResponse,
  CustomerSignInResult,
  //Customer
} from '@commercetools/platform-sdk';
//import { ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';
import { apiRoot } from './BuildClient';
import { MyApiError } from '../Interfaces';

export const useUpdateDateUser = () => {
  const [updateResult, setUpdateResult] =
  useState<ClientResponse<CustomerSignInResult> | null>(null);
const [error, setError] = useState<MyApiError | null>(null);

  const updateDateUser = async (
    id: string,
   
  ) => {
    try {
        const result: ClientResponse<CustomerSignInResult> = await apiRoot
        .customers()
        .withId({ ID: id })
        .post({
          body: {
            email: 'test20@test.com',
            password: '123456Zz',
            firstName: 'my name',
            lastName: 'my last name',
            dateOfBirth: '2005-12-12',
            addresses: [
              {
                country: 'US',
                city: 'My City',
                streetName: 'My Street 2',
                postalCode: '12345',
              },
              {
                //country: countryBilling,
                //city: cityBilling,
                //streetName: streetBilling,
                //postalCode: postalCodeBilling,
                country: 'US',
                city: 'My City',
                streetName: 'My Street 2',
                postalCode: '12345',
              },
            ],
            //defaultShippingAddress: defaultAddress ? 0 : undefined,
            //defaultBillingAddress: defaultBillingAddress ? 1 : undefined,
            defaultShippingAddress: 0,
            defaultBillingAddress: 1,
            billingAddresses: [1],
          },
        })
        .execute();
      setUpdateResult(result);
      console.log(result);
      setError(null);
    } catch (caughtError) {
      console.log(caughtError);
      setError(caughtError as MyApiError);
    }
  };
  return {
    updateResult,
    error,
    updateDateUser,
  };
};
*/
