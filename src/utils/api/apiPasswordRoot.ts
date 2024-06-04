import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { myTokenCache } from '../tokenStore';

const createApiPasswordRoot = (username: string, password: string) => {
  const PasswordOptions: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.us-central1.gcp.commercetools.com',
    projectKey: 'my-company',
    credentials: {
      clientId: 'RlxVza_Z9B7Fm83frzN4ks58',
      clientSecret: 'A1PzY6KA6kCT0VwHhKzyQhoiToAqIWDa',
      user: {
        username,
        password,
      },
    },
    tokenCache: myTokenCache,
    scopes: ['manage_project:my-company'],
    fetch,
  };

  const passwordClient = new ClientBuilder()
    .withPasswordFlow(PasswordOptions)
    .build();

  return createApiBuilderFromCtpClient(passwordClient).withProjectKey({
    projectKey: 'my-company',
  });
};

export { createApiPasswordRoot };
