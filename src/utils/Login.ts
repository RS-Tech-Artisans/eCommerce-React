import { useState } from 'react';
import { ClientResponse } from '@commercetools/platform-sdk';
import { CustomerSignInResult } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { clearTokenCache, myTokenCache } from './tokenStore';
import { useSession } from './SessionContext';
import { MyApiError } from './Interfaces';


export const useLogin = () => {
  const { setToken } = useSession();
  const [loginResult, setLoginResult] =
    useState<ClientResponse<CustomerSignInResult> | null>(null);
  const [error, setError] = useState<MyApiError | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    console.log('email ', email);
    console.log('password ', password);

    const PasswordOptions: PasswordAuthMiddlewareOptions = {
      host: 'https://auth.us-central1.gcp.commercetools.com',
      projectKey: 'my-company',
      credentials: {
        clientId: 'RlxVza_Z9B7Fm83frzN4ks58',
        clientSecret: 'A1PzY6KA6kCT0VwHhKzyQhoiToAqIWDa',
        user: {
          username: email,
          password: password,
        },
      },
      tokenCache: myTokenCache,
      scopes: ['manage_project:my-company'],
      fetch,
    };

    const passwordClient = new ClientBuilder()
      .withPasswordFlow(PasswordOptions)
      .build();

    const apiRoot = createApiBuilderFromCtpClient(
      passwordClient
    ).withProjectKey({
      projectKey: 'my-company',
    });

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
      setToken(localStorage.getItem('token'));
    } catch (caughtError) {
      console.log(caughtError);
      setError(caughtError as MyApiError);
    }
  };

  const handleLogout = () => {
    setLoginResult(null);
    setToken(null);
    clearTokenCache();
    navigate('/login');
  };

  return {
    loginResult,
    error,
    handleLogin,
    handleLogout,
  };
};
