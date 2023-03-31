import { PropsWithChildren } from "react";
import { Action } from "../../../types/util";

type PaginationProps = PropsWithChildren<{
    itemsPerPage: number,
    pageCount: number,
    currentPage: number,
    /** 
     * called when the user selects a different page. The provided number
     * indicates the newly selected page. 
     */
    onPageTurned: Action<number>,
}>;

export default (props: PaginationProps) => (
    <div>
        {Array(props.pageCount).fill(0).map((_, i) => (
            <button onClick={() => props.onPageTurned(i)}>
                {i+1}
            </button>
        ))}
    </div>
);