import { AnchorHTMLAttributes } from "react";

const Link = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (<a
  {...props}
  className={`${props.className || ""} hover:underline text-[hotpink] visited:text-slate-400`}
/>);

export default Link;
