import { useState } from 'react';
import { apiRoot } from '../utils/getProjectInfo';
import { ClientResponse } from '@commercetools/platform-sdk';
import { CustomerSignInResult } from '@commercetools/platform-sdk';

export const useLogin = () => {
  const [loginResult, setLoginResult] =
    useState<ClientResponse<CustomerSignInResult> | null>(null);
  const [error] = useState<Error | null>(null);

  const handleLogin = async (email: string, password: string) => {
    console.log('email ', email);
    console.log('password ', password);
    try {
      const result: ClientResponse<CustomerSignInResult> = await apiRoot
        .me()
        .login()
        .post({
          body: { email: email, password: password },
        })
        .execute();
      setLoginResult(result);
    } catch {
      console.log('Auth error ', error);
    }
  };

  return {
    loginResult,
    error,
    handleLogin,
  };
};
