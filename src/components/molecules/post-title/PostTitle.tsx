import Link from "@components/atoms/Link";

export type PostTitleProps = {
  title: string,
  url?: string
}

const PostTitle = ({ title, url }: PostTitleProps) =>
  <Link href={url}>
    <h2>{title}</h2>
  </Link>;

export default PostTitle;
