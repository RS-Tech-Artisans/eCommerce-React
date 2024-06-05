/*
import { useState } from 'react';
import {
  ClientResponse,
  CustomerSignInResult,
  Customer
} from '@commercetools/platform-sdk';
import { ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';
import { apiRoot } from './BuildClient';
import { MyApiError } from '../Interfaces';

export const useUpdate = () => {
  const [error, setError] = useState<MyApiError | null>(null);
  const [updateResult, setUpdateResult] =
    useState<ApiRequest<Customer> | null>(null);

  const updateCistomerUser = async (
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    street: string,
    city: string,
    postalCode: string,
    country: string,
    defaultAddress: boolean,
    defaultBillingAddress: boolean,
    streetBilling: string,
    cityBilling: string,
    postalCodeBilling: string,
    countryBilling: string
  ) => {
    try {
      const result: ApiRequest<Customer> = apiRoot
        .customers()
        .withId({ ID: id })
        .post({
          body: {
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
            addresses: [
              {
                country,
                city,
                streetName: street,
                postalCode,
              },
              {
                country: countryBilling,
                city: cityBilling,
                streetName: streetBilling,
                postalCode: postalCodeBilling,
              },
            ],
            defaultShippingAddress: defaultAddress ? 0 : undefined,
            defaultBillingAddress: defaultBillingAddress ? 1 : undefined,
            billingAddresses: [1],
          },
        });
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
    updateCistomerUser,
  };
};
*/
