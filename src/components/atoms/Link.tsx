import { AnchorHTMLAttributes } from "react";

export default (props: AnchorHTMLAttributes<{}>) => (<a 
    className="hover:underline text-[hotpink]
    visited:text-slate-400"
    {...props} 
/>);