export type DomainProps = { url: string };

const Domain = ({ url }: DomainProps) =>
  <div>
    {new URL(url).hostname.replace(/^www\./, "")}
  </div>;

export default Domain;
