import Link from "@/components/atoms/Link";
import { ChatCircleText } from "@phosphor-icons/react";
import { MouseEventHandler } from "react";

export type CommentCountProps = {
  num_comments: number,
  onClick?: MouseEventHandler<HTMLAnchorElement>,
};

const CommentCount = ({ num_comments, onClick }: CommentCountProps) =>
  <Link href={onClick ? "#" : undefined} onClick={onClick}>
    <ChatCircleText weight="thin"
      className="inline align-sub" alt="Comments" />
    {num_comments.toLocaleString(undefined, { style: "decimal" })}
  </Link>;

export default CommentCount;
