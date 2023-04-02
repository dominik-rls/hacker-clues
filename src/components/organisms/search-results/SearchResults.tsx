import { HnSearchResult } from "../../../services/hn-api";
import PageInfo from "../../molecules/page-info/PageInfo";
import Pagination from "../../molecules/pagination/Pagination";

type SearchResultsProps = {
    results: HnSearchResult
}

export default ({results}: SearchResultsProps) => (
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