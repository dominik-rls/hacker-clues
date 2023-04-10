import { AnchorHTMLAttributes } from "react";

const Link = (props: AnchorHTMLAttributes<HTMLAnchorElement>) =>
  props.href || props.onClick
    ? <a {...props}
      className={`${props.className ?? ""} 
      hover:underline text-[hotpink] visited:text-slate-400`}
    />
    : <span>{props.children}</span>;

export default Link;
