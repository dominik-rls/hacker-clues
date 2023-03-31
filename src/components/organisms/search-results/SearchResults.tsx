import { HnSearchResult } from "../../../services/hn-api";
import PageInfo from "../../molecules/page-info/PageInfo";

type SearchResultsProps = {
    results: HnSearchResult
}

export default ({results}: SearchResultsProps) => (
    <ul>
        {results.hits.map((info, i) => (
            <li key={i}>
                <PageInfo info={info} />
            </li>)
        )}
    </ul>
);