import { useState } from 'react';
import {
  ClientResponse,
  //CustomerDraft,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from './getProjectInfo';
import { useNavigate } from 'react-router-dom';

interface MyApiError {
  message: string;
}

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
    country: string
  ) => {
    try {
      const result: ClientResponse<CustomerSignInResult> = await apiRoot
        .me()
        .signup()
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
            ],
          },
        })
        .execute();
      setRegistrationResult(result);
      console.log(result);
      setError(null);
      navigate('/main');
    } catch (caughtError) {
      console.log(caughtError);
      setError(caughtError as MyApiError);
    }
  };

  return {
    registrationResult,
    error,
    handleRegistration,
  };
};
