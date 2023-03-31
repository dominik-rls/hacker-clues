import { HnPageLink, HnSearchResultEntry, HnStory } from "../../../services/hn-api";
import { UserCircle } from "@phosphor-icons/react";
import Collapsible from "react-collapsible";

import Link from "../../atoms/Link";

type PageLinkProps = {info: HnPageLink};
type StoryProps = {info: HnStory};
type PageInfoProps = {info: HnSearchResultEntry};
type AuthorProps = {author: string};


// I added a few internal micro-components, is that good practice?

const Author = ({author}: AuthorProps) => (
    <>
        <UserCircle 
            className="inline" 
            color="rgb(241, 245, 249)" 
            alt="by user" 
            weight="thin" />
        {author}
    </>
);

const PageLink = ({info}: PageLinkProps) => (
    <>
        <Link href={info.url}>
            {info.title}
        </Link>
        <Author author={info.author}></Author>
    </>
);

const Story = ({info}: StoryProps) => (
    <Collapsible trigger={info.title ?? "Untitled"}>
        <Author author={info.author}></Author>
        <p>
            {info.story_text}
        </p>
    </Collapsible>
)

export default ({info}: PageInfoProps): JSX.Element => {
    if (info.url) {
        const linkInfo = info as HnPageLink;
        return (<PageLink info={linkInfo}></PageLink>);
    } else if (info.story_text) {
        const storyInfo = info as HnStory;
        return (<Story info={storyInfo}></Story>)
    } else {
        throw new Error(`Bad argument, expected 'PageInfoProps'`)
    }
};