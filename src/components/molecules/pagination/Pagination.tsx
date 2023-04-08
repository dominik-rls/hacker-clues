import { PropsWithChildren } from "react";

import { Action } from "@/app/types/util";
import { range } from "@/app/util";
import Link from "@/components/atoms/Link";


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


type PaginationItemProps = {
    index: number,
    label?: string | number,
    noLink?: true,
    onClick?: Action<number>,
};


const PaginationItem = (paginationProps: PaginationProps) =>
  // eslint-disable-next-line react/display-name
  ({ label, index, noLink, onClick }: PaginationItemProps): JSX.Element => {
    const style = "p-2";
    const _label = label ?? index + 1;
    const clickHandler = () => onClick ? onClick(index) : paginationProps.onPageSelected(index);
    return (!noLink && index != paginationProps.currentPage
      ? <Link
        className={style}
        href={`#${index}`}
        onClick={clickHandler}
      >{_label}</Link>
      : <span
        className={style}
      >{_label}</span>
    );
  };


const Pagination = (props: PaginationProps) => {
  const MyItem = PaginationItem(props);
  const Separator = () => <span className="p-2 flex-grow">...</span>;
  const current = props.currentPage;
  const count = props.pageCount;
  const first = 0;
  const last = count - 1;
  const neighbours =
        range(current - props.neighbourCount, current + props.neighbourCount)
          .filter((n) => first <= n && n <= last);
  const currentToFirst = current - first;
  const currentToLast = last - current;
  const showFirst = currentToFirst > props.neighbourCount;
  const showLast = currentToLast > props.neighbourCount;
  const showFirstSeparator = currentToFirst > props.neighbourCount + 1;
  const showLastSeparator = currentToLast > props.neighbourCount + 1;

  return (
    <nav className="flex justify-center align-middle hover:no-underline hover:font-bold">
      {current > first ? <MyItem index={current - 1} label="◀" /> : null}
      {showFirst ? <MyItem index={first} /> : null}
      {showFirstSeparator ? <Separator /> : null}
      {neighbours.map((i) => <MyItem index={i} key={i} />)}
      {showLastSeparator ? <Separator /> : null}
      {showLast ? <MyItem index={last} /> : null}
      {current < last ? <MyItem index={current + 1} label="▶" /> : null}
    </nav>
  );
};

export default Pagination;
