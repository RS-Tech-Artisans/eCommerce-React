import { apiRoot } from './BuildClient';

export const getSizesFromAPI = async (): Promise<string[]> => {
  try {
    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          facet: 'variants.attributes.size',
          limit: 0,
        },
      })
      .execute();

    const brandsFacet = response.body.facets?.['variants.attributes.size'];
    if (brandsFacet && 'terms' in brandsFacet) {
      return brandsFacet.terms.map((term: { term: string }) => term.term);
    }
    return [];
  } catch (error) {
    console.error('Error fetching sizes:', error);
    return [];
  }
};
