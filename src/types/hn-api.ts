export type HnPageInfoJson = Readonly<Partial<{
    title: String,
    url: String,
    author: String,
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
}>>;

export type HnSearchResultJson = Readonly<Partial<{
    hits: HnPageInfoJson[],
    nbHits: number
    page: number,
    nbPages: number,
    query: String,
}>>;