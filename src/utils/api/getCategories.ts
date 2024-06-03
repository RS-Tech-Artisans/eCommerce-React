import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { apiRoot } from './getProjectInfo';

const DEFAULT_LIMIT = 500;
const DEFAULT_DATE = '2024-05-02T06:47:20.547Z';

export const getCategoriesFromAPI = async (
  createdAfter: string = DEFAULT_DATE,
  limit = DEFAULT_LIMIT
): Promise<CategoryPagedQueryResponse> => {
  try {
    const response = await apiRoot
      .categories()
      .get({
        queryArgs: {
          limit,
          where: `createdAt>"${createdAfter}"`,
        },
      })
      .execute();
    return response.body;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};
