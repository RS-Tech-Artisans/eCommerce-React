import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { myTokenCache } from '../tokenStore';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  API_HOST,
  AUTH_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
  SCOPES,
} from '../Constants';

function getToken(): string | null {
  return localStorage.getItem('refresh_token');
}

const createClient = (token: string | null) => {
  if (!AUTH_HOST || !API_HOST || !CLIENT_ID || !CLIENT_SECRET || !PROJECT_KEY) {
    throw new Error('Missing necessary environment variables');
  }

  let ctpClient;

  if (token) {
    const refreshAuthOptions: RefreshAuthMiddlewareOptions = {
      host: AUTH_HOST,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      refreshToken: token,
      tokenCache: myTokenCache,
      fetch,
    };
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: API_HOST,
      fetch,
    };

    ctpClient = new ClientBuilder()
      .withRefreshTokenFlow(refreshAuthOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  } else {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: AUTH_HOST,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      scopes: SCOPES,
      fetch,
    };
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: API_HOST,
      fetch,
    };
    const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
      host: AUTH_HOST,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      scopes: SCOPES,
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
    projectKey: PROJECT_KEY,
  });

  return apiRoot;
};

let apiRoot = createClient(getToken());

export function updateClient() {
  apiRoot = createClient(getToken());
}

export { apiRoot };
