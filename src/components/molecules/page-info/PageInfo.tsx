import { UserCircle } from "@phosphor-icons/react";
import Collapsible from "react-collapsible";

import Link from "@/components/atoms/Link";
import { HnPageLink, HnSearchResultEntry, HnStory } from "@/services/hn-api";

type PageLinkProps = { info: HnPageLink };
type StoryProps = { info: HnStory };
type PageInfoProps = { info: HnSearchResultEntry };
type AuthorProps = { author: string };

// I added a few internal micro-components, is that good practice?

const Author = ({ author }: AuthorProps) => (
  <>
    <UserCircle
      className="inline"
      color="rgb(241, 245, 249)"
      alt="by user"
      weight="thin" />
    {author}
  </>
);


const MILLIS_PER_SECOND = 1000;
type CreationTimeProps = { unixTimestampSeconds: number };
const CreationTime = ({ unixTimestampSeconds }: CreationTimeProps) => {
  const d = new Date(unixTimestampSeconds * MILLIS_PER_SECOND);
  return (
    <span>{d.toLocaleDateString()}</span>
  );
};


const PageLink = ({ info }: PageLinkProps) => (
  <>
    <Link href={info.url}>
      {info.title ?? "Untitled"}
    </Link>
    <div className="flex flex-row gap-2 text-slate-300 text-sm">
      <span>
        {new URL(info.url).hostname.replace(/^www\./, "")}
      </span>
      <span>
        <Author author={info.author}></Author>
      </span>
      <CreationTime unixTimestampSeconds={info.created_at_i} />

    </div>
  </>
);

const Story = ({ info }: StoryProps) => (
  <Collapsible trigger={info.title ?? "Untitled"}>
    <Author author={info.author}></Author>
    <CreationTime unixTimestampSeconds={info.created_at_i} />
    <p>
      {info.story_text}
    </p>
  </Collapsible>
);

const PageInfo = ({ info }: PageInfoProps): JSX.Element => {
  if (info.url) {
    const linkInfo = info as HnPageLink;
    return (<PageLink info={linkInfo}></PageLink>);
  } else if (info.story_text) {
    const storyInfo = info as HnStory;
    return (<Story info={storyInfo}></Story>);
  } else {
    throw new Error(`Bad argument, expected PageInfoProps`);
  }
};

export default PageInfo;
