import { apiRoot } from './BuildClient';

export const getSearchFromAPI = async (
  text: string,
  fuzzyLevelValue: number = 0
) => {
  try {
    await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'text.en': text,
          limit: 500,
          offset: 0,
          fuzzy: true,
          fuzzyLevel: fuzzyLevelValue,
        },
      })
      .execute();
  } catch (error) {
    console.error('Error fetching displaytechnology:', error);
    return [];
  }
};
