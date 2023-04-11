import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export type PostDateProps = {
  created_at: string;
}

// add plugin
dayjs.extend(relativeTime);

const PostDate = ({created_at}: PostDateProps) => {
  const date = new Date(created_at);
  const now = new Date().valueOf();
  const relative = dayjs(created_at).fromNow();
  const absolute = date.toLocaleDateString();
  return <div title={absolute}>{relative}</div>;
};

export default PostDate;
