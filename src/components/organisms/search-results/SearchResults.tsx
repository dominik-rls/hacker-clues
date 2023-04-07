import { HnSearchResult } from "../../../services/hn-api";
import PageInfo from "../../molecules/page-info/PageInfo";

type SearchResultsProps = {
    results: HnSearchResult
}

const SearchResults = ({results}: SearchResultsProps) => (
  <>
    <ul>
      {results.hits.map((info, i) => (
        <li className="py-4 first:border-t-0 border-t-[1px] border-t-slate-600" key={i}>
          <PageInfo info={info} />
        </li>)
      )}
    </ul>
  </>
);

export default SearchResults;
