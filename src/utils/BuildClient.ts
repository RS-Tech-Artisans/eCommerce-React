import {
  ClientBuilder,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { myTokenCache } from './tokenStore';

function getToken(): string | null {
  return localStorage.getItem('refresh_token');
}

const token = getToken();
let ctpClient;

function apiRootClient() {
  if (token) {
    console.log('we have token ' + token);

    const options: RefreshAuthMiddlewareOptions = {
      host: 'https://auth.us-central1.gcp.commercetools.com',
      projectKey: 'my-company',
      credentials: {
        clientId: 'RlxVza_Z9B7Fm83frzN4ks58',
        clientSecret: 'A1PzY6KA6kCT0VwHhKzyQhoiToAqIWDa',
      },
      refreshToken: token, //my-company:LMlke1saPGO7lcvpwSjLnmqBxk19fDKvOblWvZpEP2M
      tokenCache: myTokenCache,
      fetch,
    };
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: 'https://api.us-central1.gcp.commercetools.com',
      fetch,
    };

    ctpClient = new ClientBuilder()
      .withRefreshTokenFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  } else {
    console.log('we DO NOT have token ');

    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: 'https://auth.us-central1.gcp.commercetools.com',
      projectKey: 'my-company',
      credentials: {
        clientId: 'RlxVza_Z9B7Fm83frzN4ks58',
        clientSecret: 'A1PzY6KA6kCT0VwHhKzyQhoiToAqIWDa',
      },
      scopes: ['manage_project:my-company'],
      fetch,
    };
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: 'https://api.us-central1.gcp.commercetools.com',
      fetch,
    };
    ctpClient = new ClientBuilder()
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions) // for email search
      .withLoggerMiddleware()
      .build();
  }

  return ctpClient;
}

const apiRoot = apiRootClient();

export { apiRoot as ctpClient };
