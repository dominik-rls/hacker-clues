import { GithubLogo } from "@phosphor-icons/react";
import Link from "@/components/atoms/Link";

const AppFooter = () =>
  <footer className="mt-8 mb-2">
    <div className="flex justify-center">
      <Link target="_blank" href="https://github.com/drosehnal/hacker-clues"
        className="text-lg rounded-full py-2 px-8 opacity-75
              hover:opacity-100 hover:from-pink-600 hover:to-blue-950
              bg-gradient-to-br hover:text-white">
        <GithubLogo className="inline stroke-[hotpink]" size="1.2em" weight="regular" alt="Github"/>
            drosehnal/hacker-clues
      </Link>
    </div>
  </footer>;

export default AppFooter;
