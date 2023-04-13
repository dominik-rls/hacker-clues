import { PropsWithChildren } from "react";

import { Action } from "@/app/types/util";
import { range } from "@/app/util";
import Link from "@/components/atoms/Link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";


type PaginationProps = PropsWithChildren<{
  uuid: string,
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


type PaginationItemProps = PropsWithChildren & Readonly<{
  index: number,
  label?: "Left" | "Right",
  noLink?: true,
  onClick?: Action<number>,
}>;

const PaginationItem = (paginationProps: PaginationProps) =>
  // eslint-disable-next-line react/display-name
  ({ label, index, noLink, onClick }: PaginationItemProps): JSX.Element => {
    const style = "px-4 py-2";
    const linkStyle = `${style} hover:no-underline hover:rounded-full
      hover:from-pink-600 hover:to-blue-950 bg-gradient-to-br hover:text-white
      hover:text-white text-[hotpink]`;
    const _label =
      label === "Left" ? <CaretLeft weight="thin" className="align-middle" />
        : label === "Right" ? <CaretRight weight="thin" className="align-middle" />
          : label ?? index + 1;
    const clickHandler = () => onClick ? onClick(index) : paginationProps.onPageSelected(index);
    const isLink = !noLink && index != paginationProps.currentPage;

    return isLink?
      <Link className={linkStyle} href={`#${paginationProps.uuid}-${index}`}
        onClick={clickHandler}>{_label}</Link>
      : <span className={style}>{_label}</span>;
  };


const Pagination = (props: PaginationProps) => {
  const MyItem = PaginationItem(props);
  const Separator = () => <span className="p-2">...</span>;
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
    <nav className="flex justify-center items-center">
      {current > first ? <MyItem index={current - 1} label="Left" /> : null}
      {showFirst ? <MyItem index={first} /> : null}
      {showFirstSeparator ? <Separator /> : null}
      {neighbours.map((i) => <MyItem index={i} key={i} />)}
      {showLastSeparator ? <Separator /> : null}
      {showLast ? <MyItem index={last} /> : null}
      {current < last ? <MyItem index={current + 1} label="Right" /> : null}
    </nav>
  );
};

export default Pagination;
