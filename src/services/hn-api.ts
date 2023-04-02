import Ajv, { JSONSchemaType } from 'ajv';

import searchResultJson from './schema/search-result.json';


export type HnSearchResultEntryBase = Readonly<{
    title: string | null, // Yes, title can be null...
    author: string,
    num_comments: number,
    /** creation date as unix timestamp in SECONDS */
    created_at_i: number,
    /** User ranking */
    points: number,
    [key: string]: unknown,
}>;

export type HnPageLink = HnSearchResultEntryBase & Readonly<{
    url: string
}>;

export type HnStory = HnSearchResultEntryBase & Readonly<{
    story_text: string
}>;

/*
 * Make sure to run `npm run build` when this type changes to update the schema.
 */
export type HnSearchResultEntry = HnPageLink | HnStory;

//    num_comments: number,
//    /** creation date as unix timestamp in SECONDS */
//    created_at_i: number,
//    /** User ranking */
//    points: number,
//    story_text: String | null,
//    _highlightedResult: Readonly<Partial<{
//        title: {
//            /** page title where the part matching the query is highlighted */
//            value: String
//        }

export type HnSearchResult = Readonly<{
    hits: HnSearchResultEntry[],
    hitsPerPage: number,
    nbHits: number
    page: number,
    query: string,
    [key: string]: unknown,
}>;

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const ajv = new Ajv();
const validateHnSearchResult = ajv.compile(searchResultJson);

export const fetchSearchResults = async (query: string, page: number) => {
    const url = `${API_ENDPOINT}${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);
    const json = await response.json()
    if (json && validateHnSearchResult(json)) {
        return json as HnSearchResult;
    } else {
        if (json) {
            console.error("Oops:", json, validateHnSearchResult.errors);
        }
        throw new Error(`Invalid data`);
    }
};