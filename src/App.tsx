import { HnSearchResultEntry } from "./services/hn-api";
import SearchView from "./components/pages/search-view/SearchView";
import { GithubLogo } from "@phosphor-icons/react";
import Link from "./components/atoms/Link";

const PAGE_INFO_TEST: HnSearchResultEntry = {
  "created_at": "2018-03-14T03:50:30.000Z",
  "title": "Stephen Hawking has died",
  "url": "http://www.bbc.com/news/uk-43396008",
  "author": "Cogito",
  "points": 6015,
  "story_text": null,
  "comment_text": null,
  "num_comments": 436,
  "story_id": null,
  "story_title": null,
  "story_url": null,
  "parent_id": null,
  "created_at_i": 1520999430,
  "relevancy_score": 8012,
  "_tags": [
      "story",
      "author_Cogito",
      "story_16582136"
  ],
  "objectID": "16582136",
  "_highlightResult": {
      "title": {
          "value": "Stephen Hawking has died",
          "matchLevel": "none",
          "matchedWords": []
      },
      "url": {
          "value": "http://www.bbc.com/news/uk-43396008",
          "matchLevel": "none",
          "matchedWords": []
      },
      "author": {
          "value": "Cogito",
          "matchLevel": "none",
          "matchedWords": []
      }
  }
};

function App() {
  return (
    <div className="outline focus:outline-yellow-300 min-h-screen flex flex-col justify-center items-center bg-slate-800 text-slate-100">
      <SearchView />
      <footer>
        <div className="opacity-50">
          <Link target="_blank" href="https://github.com/drosehnal/hacker-clues">
            <GithubLogo className="inline" size="1.2em" weight="regular" color="hotpink" alt="Github"/>
            drosehnal/hacker-clues
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default App;
