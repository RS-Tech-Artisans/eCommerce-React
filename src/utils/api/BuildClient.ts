import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { myTokenCache } from '../tokenStore';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

function getToken(): string | null {
  return localStorage.getItem('refresh_token');
}

const createClient = (token: string | null) => {
  let ctpClient;

  if (token) {
    const options: RefreshAuthMiddlewareOptions = {
      host: 'https://auth.us-central1.gcp.commercetools.com',
      projectKey: 'my-company',
      credentials: {
        clientId: 'RlxVza_Z9B7Fm83frzN4ks58',
        clientSecret: 'A1PzY6KA6kCT0VwHhKzyQhoiToAqIWDa',
      },
      refreshToken: token,
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
    const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
      host: 'https://auth.us-central1.gcp.commercetools.com',
      projectKey: 'my-company',
      credentials: {
        clientId: 'RlxVza_Z9B7Fm83frzN4ks58',
        clientSecret: 'A1PzY6KA6kCT0VwHhKzyQhoiToAqIWDa',
      },
      scopes: ['manage_project:my-company'],
      fetch,
    };
    ctpClient = new ClientBuilder()
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
      .build();
  }

  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: 'my-company',
  });

  return apiRoot;
};

let apiRoot = createClient(getToken());

export function updateClient() {
  apiRoot = createClient(getToken());
}

export { apiRoot };
