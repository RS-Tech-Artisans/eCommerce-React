import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

const createTokenCache = (): TokenCache => {
  let myCache: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  const set = (newCache: TokenStore): void => {
    myCache = newCache;
    localStorage.setItem('token', myCache.token);
  };

  const get = (): TokenStore => {
    return myCache;
  };

  return {
    set,
    get,
  };
};

export const myTokenCache = createTokenCache();

const clearTokenCache = (): void => {
  myTokenCache.set({
    token: '',
    expirationTime: 0,
    refreshToken: '',
  });
  localStorage.removeItem('token');
};

export { clearTokenCache };
