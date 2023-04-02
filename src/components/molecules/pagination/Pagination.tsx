import { PropsWithChildren } from "react";
import { Action } from "../../../types/util";
import { range } from "../../../util";
import Link from "../../atoms/Link";

type PaginationProps = PropsWithChildren<{
    pageCount: number,
    currentPage: number,
    /**
     * How many links to show preceding/following the current page number.
     */
    neighbourCount: number,
    /** 
     * called when the user selects a different page. The provided number
     * indicates the newly selected page. 
     */
    onPageSelected: Action<number>,
}>;

export default (props: PaginationProps) => {
    const MyItem = PaginationItem(props);
    const Separator = () => <span className="p-2 flex-grow">...</span>;
    const current = props.currentPage;
    const count = props.pageCount;
    const first = 0;
    const last = count-1;
    const neighbours = 
        range(current - props.neighbourCount, current + props.neighbourCount)
        .filter(n => first <= n && n <= last);
    const currToFirst = current - first;
    const currToLast = last - current;
    const showFirst = currToFirst > props.neighbourCount;
    const showLast = currToLast > props.neighbourCount;
    const showFirstSeparator = currToFirst > props.neighbourCount + 1;
    const showLastSeparator = currToLast > props.neighbourCount + 1;

    return (
        <nav className="flex justify-center align-middle">
            { current > first? <MyItem index={current-1} label="◀"/> : null }
            { showFirst? <MyItem index={first}/> : null }
            { showFirstSeparator? <Separator />: null }
            { neighbours.map(i => <MyItem index={i}/>) }
            { showLastSeparator? <Separator /> : null }
            { showLast? <MyItem index={last}/> : null }
            { current < last? <MyItem index={current+1} label="▶"/> : null }
        </nav>
    );
};

type PaginationItemProps = {
    index: number,
    label?: string|number,
    noLink?: true,
    onClick?: Action<number>,
};
const PaginationItem = (props: PaginationProps) => 
    ({label, index, noLink, onClick}: PaginationItemProps): JSX.Element => 
{
    const style = "p-2";
    const clickHandler = () => onClick? onClick(index) : props.onPageSelected(index);
    return !noLink && index != props.currentPage
        ? <Link className={style} href="#" onClick={clickHandler}>{label ?? index+1}</Link>
        : <span className={style} >{label ?? index+1}</span>;
};