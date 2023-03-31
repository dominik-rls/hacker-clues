import Ajv, { JSONSchemaType } from 'ajv';

import searchResultJson from './schema/search-result.json';


export type HnPageInfo = Readonly<{
    title: string,
    url: string,
    author: string,
    [key: string]: unknown,
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
//    }>>
}>;

export type HnSearchResult = Readonly<{
    hits: HnPageInfo[],
    nbHits: number
    page: number,
    nbPages: number,
    query: string,
    [key: string]: unknown,
}>;


const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
const ajv = new Ajv();
const validateHnSearchResult = ajv.compile(searchResultJson);


export const fetchSearchResults = async (query: string) => {
    const response = await fetch(API_ENDPOINT + encodeURIComponent(query));
    const json = await response.json()
    if (json && validateHnSearchResult(json)) {
        return json as HnSearchResult;
    } else {
        throw new Error(`Invalid data`);
    }
}