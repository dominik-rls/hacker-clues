
export type PostDateProps = {
  created_at: string;
}

const _24HRS = 1000*60*24;

const PostDate = ({created_at}: PostDateProps) => {
  const date = new Date(created_at);
  const now = new Date().valueOf();
  const intheLast24hrs = now - date.valueOf() <= _24HRS;
  return <div>
    {intheLast24hrs
      ? date.toLocaleTimeString()
      : date.toLocaleDateString()}
  </div>;
};

export default PostDate;
