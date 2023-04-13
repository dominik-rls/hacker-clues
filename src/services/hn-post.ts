import Ajv from "ajv";

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


export const determinePostType = (base: HnPostBase): HnPostType | undefined =>
  typeof base?.url === "string" && base.url ? "link"
    : typeof base?.story_text === "string" ? "story"
      : typeof base?.comment_text === "string" ? "comment"
        : undefined;


export const tryNormalizePost = (maybePost: object): Either<HnNormalizedPost, unknown> => {
  const ok = validatePostBase(maybePost);
  const type = determinePostType(maybePost as HnPostBase);
  if (ok && type) {
    const base = maybePost as HnPostBase;
    const value: HnNormalizedPost = {
      ...base,
      type,
      title: base.title
        || type === "comment" && (<HnCommentPost>base).story_title
        || type === "story" && (<HnStoryPost>base).story_text
        || "Untitled",
      url: type === "link" && (<HnLinkPost>base).url
        || type === "comment" && (<HnCommentPost>base).story_url
        || undefined,
      comment: type === "comment"? (<HnCommentPost>base).comment_text : undefined
    };
    return {value, error: false};
  } else {
    return {value: undefined, error: validatePostBase.errors};
  }
};
