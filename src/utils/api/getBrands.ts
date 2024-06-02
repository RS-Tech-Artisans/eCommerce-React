import { apiRoot } from './getProjectInfo';

export const getBrandsFromAPI = async (): Promise<string[]> => {
  try {
    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          facet: 'variants.attributes.brand',
          limit: 0,
        },
      })
      .execute();

    const brandsFacet = response.body.facets?.['variants.attributes.brand'];
    if (brandsFacet && 'terms' in brandsFacet) {
      return brandsFacet.terms.map((term: { term: string }) => term.term);
    }
    return [];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
};
