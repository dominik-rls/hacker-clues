import Domain from "@/components/atoms/Domain";
import { HnPostType, tryNormalizePost } from "@/services/hn-post";
import Author from "@/components/molecules/author/Author";
import CommentCount from "@/components/molecules/comment-count/CommentCount";
import PostPoints from "@/components/molecules/post-points/PostPoints";
import PostTitle from "@/components/molecules/post-title/PostTitle";
import PostDate from "../post-date/PostDate";


export type PostInfoProps = { unverifiedPost: object };

const PostInfo = ({ unverifiedPost }: PostInfoProps) => {
  const post = tryNormalizePost(unverifiedPost);
  if (post) {
    const url = post.type === HnPostType.Link ? post.url : undefined;
    const title = post.title
      || (post.type === HnPostType.Story && post.story_text)
      || "untitled";
    return <section>
      <PostTitle title={title} url={url} />
      <div className="flex flex-row gap-1 sm:gap-4">
        {url ? <Domain url={url} /> : null}
        <PostDate created_at={post.created_at} />
        <Author author={post.author} />
        {post.points ? <PostPoints points={post.points} /> : null}
        <CommentCount num_comments={post.num_comments}></CommentCount>
      </div>
    </section>;
  } else if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error(`Unable to normalize: ${JSON.stringify(unverifiedPost)}`);
  }
  return <></>;
};

export default PostInfo;
