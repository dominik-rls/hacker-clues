import { Heart } from "@phosphor-icons/react";

export type PostPointsProps = {
  points: number;
}

const PostPoints = ({points}: PostPointsProps) =>
  <div>
    <Heart weight="thin" alt="Points" className="inline align-sub" />
    {points.toLocaleString(undefined, {style: "decimal"})}
  </div>;

export default PostPoints;
