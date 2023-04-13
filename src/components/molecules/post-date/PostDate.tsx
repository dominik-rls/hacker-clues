import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export type PostDateProps = {
  created_at: string;
}

dayjs.extend(relativeTime);

const PostDate = ({created_at}: PostDateProps) => {
  const date = new Date(created_at);
  const relative = dayjs(created_at).fromNow();
  const absolute = date.toLocaleDateString();
  return <span title={absolute}>{relative}</span>;
};

export default PostDate;
