import { useState } from 'react';
import {
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from './getProjectInfo';

interface MyApiError {
  message: string;
}

export const useRegistration = () => {
  const [loginResult] = useState<ClientResponse<CustomerDraft> | null>(null);
  const [error, setError] = useState<MyApiError | null>(null);

  const handleRegistration = async (email: string, password: string) => {
    console.log('email ', email);
    console.log('password ', password);

    try {
      const result: ClientResponse<CustomerSignInResult> = await apiRoot
        .me()
        .signup()
        .post({
          body: {
            email: 'jenner@example.com',
            password: 'password',
            firstName: 'Jenniferr',
            lastName: 'Robinsonn',
            dateOfBirth: '2013-12-22',
            addresses: [
              {
                country: 'US',
                city: 'n',
                streetName: 'd2g',
                postalCode: '10001-1234',
              },
            ],
          },
        })
        .execute();
      //setLoginResult(result);
      console.log(result);
      setError(null);
    } catch (caughtError) {
      console.log(caughtError);
      setError(caughtError as MyApiError);
    }
  };

  return {
    loginResult,
    error,
    handleRegistration,
  };
};
