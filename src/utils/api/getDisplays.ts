import { apiRoot } from './BuildClient';

export const getDisplaysFromAPI = async (): Promise<string[]> => {
  try {
    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          facet: 'variants.attributes.displaytechnology',
          limit: 0,
        },
      })
      .execute();

    const brandsFacet =
      response.body.facets?.['variants.attributes.displaytechnology'];
    if (brandsFacet && 'terms' in brandsFacet) {
      return brandsFacet.terms.map((term: { term: string }) => term.term);
    }
    return [];
  } catch (error) {
    console.error('Error fetching displaytechnology:', error);
    return [];
  }
};
