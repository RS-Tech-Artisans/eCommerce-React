import { useState } from 'react';
import { ClientResponse } from '@commercetools/platform-sdk';
import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { clearTokenCache } from './tokenStore';
import { useSession } from './SessionContext';
import { MyApiError } from './Interfaces';
import { createApiPasswordRoot } from './api/apiPasswordRoot'; 
import { updateClient } from './api/BuildClient';

export const useLogin = () => {
  const { setToken } = useSession();
  const [loginResult, setLoginResult] = useState<ClientResponse<CustomerSignInResult> | null>(null);
  const [error, setError] = useState<MyApiError | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const apiPasswordRoot = createApiPasswordRoot(email, password);
      const result: ClientResponse<CustomerSignInResult> = await apiPasswordRoot
        .me()
        .login()
        .post({
          body: { email, password },
        })
        .execute();

        
    console.log('email ', email);
    console.log('password ', password);
    
        setLoginResult(result);
        setError(null);
        setToken(localStorage.getItem('refresh_token'));
        updateClient();

      
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
