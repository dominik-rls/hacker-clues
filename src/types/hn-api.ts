export type HnPageJson = Readonly<Partial<{
    title: String,
    url: String,
    author: String,
//    num_comments: number,
//    /** creation date as unix timestamp in SECONDS */
//    created_at_i: number,
//    /** awarded by visitors */
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
    hits: HnPageJson[],
    nbHits: number
    page: number,
    nbPages: number,
    query: String,
}>>;
