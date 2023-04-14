import { tryNormalizePost } from "@/services/hn-post";

import Domain from "@/components/atoms/Domain";
import Author from "@/components/molecules/author/Author";
import CommentCount from "@/components/molecules/comment-count/CommentCount";
import PostPoints from "@/components/molecules/post-points/PostPoints";
import PostTitle from "@/components/molecules/post-title/PostTitle";
import PostDate from "@/components/molecules/post-date/PostDate";
import PostComment from "@/components/molecules/post-comment/PostComment";
import { BracketsCurly } from "@phosphor-icons/react";
import { isDebug } from "@/app/util";


export type PostInfoProps = { unverifiedPost: object };

const DumpPost = ({ post }: { post: unknown }) =>
  // eslint-disable-next-line no-console
  <button onClick={() => console.log(post)} title="Write JOSN to console">
    <BracketsCurly></BracketsCurly>
  </button>;

const PostInfo = ({ unverifiedPost }: PostInfoProps) => {
  const { value: post, error } = tryNormalizePost(unverifiedPost);
  if (post) {
    return <section>
      <PostTitle title={post.title} url={post.url} />
      {post.comment ? <PostComment comment_text={post.comment} /> : null}
      <div className="flex flex-row gap-1 sm:gap-4">
        {window.innerWidth >= 600 && post.url ? <Domain url={post.url} /> : null}
        <PostDate created_at={post.created_at} />
        <Author author={post.author} />
        {post.points ? <PostPoints points={post.points} /> : null}
        {post.num_comments
          ? <CommentCount num_comments={post.num_comments}></CommentCount>
          : null}
        <DumpPost post={post} />
      </div>
    </section>;
  } else {
    if (isDebug()) {
      // eslint-disable-next-line no-console
      console.error(`Unable to normalize:`, unverifiedPost, error);
      return <section>
        <p>{JSON.stringify(unverifiedPost)}</p>
        <DumpPost post={unverifiedPost} />
      </section>;
    } else {
      return null;
    }
  }
};

export default PostInfo;
