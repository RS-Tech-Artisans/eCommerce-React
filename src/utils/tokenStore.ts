import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

const createTokenCache = (): TokenCache => {
  let myCache: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  const set = (newCache: TokenStore): void => {
    myCache = newCache;
    if (myCache.refreshToken)
      localStorage.setItem('refresh_token', myCache.refreshToken);
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
  localStorage.removeItem('refresh_token');
};

export { clearTokenCache };
