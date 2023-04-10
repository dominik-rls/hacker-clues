import Ajv from "ajv";

import postBaseJson from "./schema/post-base.json";


export enum HnPostType { Link, Story, Discussion }

/*
 * Make sure to run `npm run build` when this type changes to update the schema.
 */
export type HnPostBase = Readonly<{
  title: string | null, // Yes, title can be null...
  author: string,
  num_comments: number,
  /** creation date */
  created_at: string,
  /** User ranking */
  points: number,
  [key: string]: unknown,
}>;
//    num_comments: number,
//    /** creation date as unix timestamp in SECONDS */
//    created_at_i: number,
//    /** User ranking */
//    points: number,
//    story_text: String | null,
//    _highlightedResult: Readonly<Partial<{
//        title: {
//            /** page title where the part matching the query is highlighted */
//        >    value: String
//        }


export type HnLinkPost = HnPostBase & Readonly<{
  url: string,
  type: HnPostType.Link,
}>;

export type HnStoryPost = HnPostBase & Readonly<{
  story_text: string,
  type: HnPostType.Story
}>;

export type HnDiscussionPost = HnPostBase & Readonly<{
  type: HnPostType.Discussion
}>;

export type HnPost = HnLinkPost | HnStoryPost | HnDiscussionPost;


const ajv = new Ajv();
const validatePostBase = ajv.compile(postBaseJson);


export const determinePostType = (base: HnPostBase): HnPostType =>
  typeof base?.url === "string" ? HnPostType.Link
    : typeof base?.story_text === "string" ? HnPostType.Story
      : HnPostType.Discussion;

export const tryNormalizePost = (maybePost: object): HnPost | false => {
  if (!validatePostBase(maybePost)) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error(validatePostBase.errors);
    }
    return false;
  }
  const type = determinePostType(maybePost as HnPostBase);
  return {...maybePost, type} as HnPost;
};
