import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { apiRoot } from './getProjectInfo';

export const getCategoriesFromAPI =
  async (): Promise<CategoryPagedQueryResponse> => {
    try {
      const response = await apiRoot.categories().get().execute();
      return response.body;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  };
