import { useState } from 'react';
import { ClientResponse } from '@commercetools/platform-sdk';
import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { clearTokenCache } from './tokenStore';
import { useSession } from './SessionContext';
import { MyApiError } from './Interfaces';
import { createApiPasswordRoot } from './api/apiPasswordRoot';
import { apiRoot, updateClient } from './api/BuildClient';

export const useLogin = () => {
  const { setToken } = useSession();
  const [loginResult, setLoginResult] =
    useState<ClientResponse<CustomerSignInResult> | null>(null);
  const [error, setError] = useState<MyApiError | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    console.log(email, password);
    try {
      const result: ClientResponse<CustomerSignInResult> = await apiRoot
        .me()
        .login()
        .post({
          body: {
            email,
            password,
            activeCartSignInMode: 'MergeWithExistingCustomerCart',
          },
        })
        .execute();

      localStorage.removeItem('cartitems'); // clear we can get data from anonum
      const apiPasswordRoot = createApiPasswordRoot(email, password);

      await apiPasswordRoot.me().get().execute();
      setLoginResult(result);
      setError(null);
      setToken(localStorage.getItem('refresh_token'));
      updateClient();
    } catch (caughtError) {
      setError(caughtError as MyApiError);
    }
  };

  const handleLogout = () => {
    setLoginResult(null);
    setToken(null);
    clearTokenCache();
    localStorage.removeItem('cartitems'); // clear we can get data from user
    navigate('/login');
  };

  return {
    loginResult,
    error,
    handleLogin,
    handleLogout,
  };
};
