import Ajv from "ajv";

import searchResultJson from "./schema/search-result.json";

/*
 * Make sure to run `npm run build` when this type changes to update the schema.
 */
export type HnSearchResult = Readonly<{
  hitsPerPage: number,
  nbHits: number
  page: number,
  query: string,
  hits: object[],
  nbPages: number,
  [key: string]: unknown,
}>;


const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
const ajv = new Ajv();
const validateHnSearchResult = ajv.compile(searchResultJson);

/**
 * Get search results and verify the result.
 * @param query
 * @param page
 * @returns
 */
export const fetchSearchResults = async (query: string, page: number) => {
  const url = `${API_ENDPOINT}${encodeURIComponent(query)}&page=${page}`;
  const response = await fetch(url);
  const json = await response.json();
  if (json && validateHnSearchResult(json)) {
    return json as HnSearchResult;
  } else {
    if (json && import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error(validateHnSearchResult.errors);
    }
    throw new Error(`Invalid data`);
  }
};
