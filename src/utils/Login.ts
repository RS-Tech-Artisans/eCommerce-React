import { useState } from 'react';
import { apiRoot } from '../utils/getProjectInfo';
import { ClientResponse } from '@commercetools/platform-sdk';
import { CustomerSignInResult } from '@commercetools/platform-sdk';

export const useLogin = () => {
  const [loginResult, setLoginResult] =
    useState<ClientResponse<CustomerSignInResult> | null>(null);
  const [error] = useState<Error | null>(null);

  const handleLogin = async () => {
    try {
      const result: ClientResponse<CustomerSignInResult> = await apiRoot
        .me()
        .login()
        .post({
          body: { email: 'jen@example.com', password: ';.cZ:GY[&Qzb/h}d' },
        })
        .execute();
      setLoginResult(result);
    } catch {
      console.log('Auth error');
    }
  };

  return {
    loginResult,
    error,
    handleLogin,
  };
};
