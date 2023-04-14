import Ajv, { stringify } from "ajv";

import postBaseJson from "./schema/post-base.json";
import { Either } from "@/app/types/util";


export type HnPostType = "link" | "story" | "comment";

/*
 * Make sure to run `npm run build` when this type changes to update the schema.
 */
export type HnPostBase = Readonly<{
  title: string | null,
  author: string,
  num_comments: number | null,
  /** creation date */
  created_at: string,
  /** User ranking */
  points: number | null,
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
  type: "link",
}>;

export type HnStoryPost = HnPostBase & Readonly<{
  story_text: string,
}>;

export type HnCommentPost = HnPostBase & Readonly<{
  comment_text: string,
  story_title: string,
  story_url: string,
}>;

export type HnPost
  = HnLinkPost
  | HnStoryPost
  | HnCommentPost

export type HnNormalizedPost = HnPostBase & Readonly<{
  comment: string | undefined,
  title: string,
  url: string | undefined,
}>;


const ajv = new Ajv();
const validatePostBase = ajv.compile(postBaseJson);


export const tryNormalizePost = (maybePost: object): Either<HnNormalizedPost, unknown> => {
  const ok = validatePostBase(maybePost);
  if (ok) {
    const base = maybePost as HnPostBase;
    const title = base?.title 
      || base?.story_title as string | null
      || base?.story_text as string | null
      || "Untitled";
    const url = base?.url as string | null
      || base?.story_url as string | null
      || undefined;
    const comment = base?.comment_text as string | null 
      || undefined;
    const type: HnPostType | undefined
      = url ? "link"
      : comment ? "comment"
      : title ? "story"
      : undefined;
    return (type
      ? {value: {...base, title, url, comment, type}, error: false}
      : {value: undefined, error: "Unknown type"});
  } else {
    return {value: undefined, error: validatePostBase.errors};
  }
};
