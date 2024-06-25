import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { myTokenCache } from '../tokenStore';
import { AUTH_HOST, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY, SCOPES } from '../Constants';

const createApiPasswordRoot = (username: string, password: string) => {
  if (!AUTH_HOST || !CLIENT_ID || !CLIENT_SECRET || !PROJECT_KEY) {
    throw new Error('Missing necessary environment variables');
  }

  const passwordOptions: PasswordAuthMiddlewareOptions = {
    host: AUTH_HOST,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      user: {
        username,
        password,
      },
    },
    tokenCache: myTokenCache,
    scopes: SCOPES,
    fetch,
  };

  const passwordClient = new ClientBuilder()
    .withPasswordFlow(passwordOptions)
    .build();

  return createApiBuilderFromCtpClient(passwordClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });
};

export { createApiPasswordRoot };
