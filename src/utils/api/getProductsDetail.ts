import { apiRoot } from './getProjectInfo';

export const getProductDetailById = (ID: string) => {
  return apiRoot
    .productProjections()
    .withId({ ID })
    .get()
    .execute()
    .then((response) => response.body);
};
