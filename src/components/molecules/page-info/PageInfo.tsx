import { HnPageInfo } from "../../../services/hn-api";
import { UserCircle } from "@phosphor-icons/react";

type PageInfoProps = {info: HnPageInfo};

export default ({info}: PageInfoProps) => (
    <>
        <p className="text-slate-100">
            <a className="underline" href={info.url}>
                {info.title}
            </a>
            (<UserCircle 
                className="inline" 
                color="rgb(241, 245, 249)" 
                alt="by user" 
                weight="thin" />
            {info.author})
        </p>
    </>
);