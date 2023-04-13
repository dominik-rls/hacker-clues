import { truncate, stripHtmlTags, unescapeHtmlChars } from "@/app/util";
import { ChatCircleText } from "@phosphor-icons/react";

export type PostCommentProps = {
  comment_text: string,
};

const PostComment = ({comment_text}: PostCommentProps): JSX.Element => {
  const comment = unescapeHtmlChars(stripHtmlTags(comment_text));
  return <p title={comment}>
    <ChatCircleText weight="thin" className="inline align-sub" alt="Comment" />
    {truncate(comment, 100)}
  </p>;
};

export default PostComment;
