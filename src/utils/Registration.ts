import { useState } from 'react';
import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { MyApiError } from './Interfaces';
import { apiRoot } from './api/BuildClient';

export const useRegistration = () => {
  const [registrationResult, setRegistrationResult] =
    useState<ClientResponse<CustomerSignInResult> | null>(null);
  const [error, setError] = useState<MyApiError | null>(null);
  const navigate = useNavigate();

  const handleRegistration = async (
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
      const result: ClientResponse<CustomerSignInResult> = await apiRoot
        .customers()
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
        })
        .execute();
      setRegistrationResult(result);
      setError(null);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (caughtError) {
      setError(caughtError as MyApiError);
    }
  };

  return {
    registrationResult,
    error,
    handleRegistration,
  };
};
