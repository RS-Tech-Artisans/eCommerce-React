import { ctpClient } from './BuildClient';
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'my-company',
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools CC API without any endpoints.
const getProject = () => {
  return apiRoot.get().execute();
};

// Retrieve Project information and output the result to the log
getProject().then(console.log).catch(console.error);

export { apiRoot };
