import { useState } from 'react';
import { ClientResponse } from '@commercetools/platform-sdk';
import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { clearTokenCache } from './tokenStore';
import { useSession } from './SessionContext';
import { MyApiError } from './Interfaces';
import { createApiPasswordRoot } from './api/apiPasswordRoot';

export const useLogin = () => {
  const { setToken } = useSession();
  const [loginResult, setLoginResult] =
    useState<ClientResponse<CustomerSignInResult> | null>(null);
  const [error, setError] = useState<MyApiError | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    console.log('email ', email);
    console.log('password ', password);
    try {
      const apiPasswordRoot = createApiPasswordRoot(email, password);
      const result: ClientResponse<CustomerSignInResult> = await apiPasswordRoot
        .me()
        .login()
        .post({
          body: { email, password },
        })
        .execute();
      //console.log(result);

      setLoginResult(result);
      setError(null);
      setToken(localStorage.getItem('refresh_token'));
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
