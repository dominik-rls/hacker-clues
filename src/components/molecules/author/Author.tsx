import { UserCircle } from "@phosphor-icons/react";
import { MouseEventHandler } from "react";
import Link from "@/components/atoms/Link";

export type AuthorProps = {
    author: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>,
};

// I added a few internal micro-components, is that good practice?

const Author = ({ author, onClick }: AuthorProps) => {
  return (
    <Link href={onClick ? "#" : undefined} onClick={onClick}>
      <UserCircle
        className="inline hover:no-underline align-sub"
        alt="by user"
        weight="thin" />
      {author}
    </Link>
  );
};

export default Author;
