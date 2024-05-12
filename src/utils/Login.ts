import { useState } from 'react';
import { apiRoot } from '../utils/getProjectInfo';
import { ClientResponse } from '@commercetools/platform-sdk';
import { CustomerSignInResult } from '@commercetools/platform-sdk';

interface MyApiError {
  message: string;
}

export const useLogin = () => {
  const [loginResult, setLoginResult] =
    useState<ClientResponse<CustomerSignInResult> | null>(null);
  const [error, setError] = useState<MyApiError | null>(null);

  const handleLogin = async (email: string, password: string) => {
    console.log('email ', email);
    console.log('password ', password);

    try {
      const result: ClientResponse<CustomerSignInResult> = await apiRoot
        .me()
        .login()
        .post({
          body: { email, password },
        })
        .execute();
      setLoginResult(result);
      setError(null);
    } catch (caughtError) {
      console.log(caughtError);
      setError(caughtError as MyApiError);
    }
  };

  return {
    loginResult,
    error,
    handleLogin,
  };
};
