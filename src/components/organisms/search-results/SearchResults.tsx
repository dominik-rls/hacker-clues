import { HnSearchResult } from "../../../services/hn-api";
import PostInfo from "@/components/molecules/post-info/PostInfo";
import { HnPost } from "@/services/hn-post";

type SearchResultsProps = {
    results: HnSearchResult
}

const SearchResults = ({results}: SearchResultsProps) => (
  <>
    <ul>
      {results.hits.map((info, i) => (
        <li className="py-4 first:border-t-0 border-t-[1px] border-t-slate-600" key={i}>
          <PostInfo unverifiedPost={info as HnPost} />
        </li>)
      )}
    </ul>
  </>
);

export default SearchResults;
