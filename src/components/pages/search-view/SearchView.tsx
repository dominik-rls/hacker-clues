import { SetStateAction, useState } from "react";

import { fetchSearchResults, HnSearchResult } from "../../../services/hn-api";
import LoadIndicator from "../../molecules/load-indicator/LoadIndicator";
import SearchBar from "../../molecules/search-bar/SearchBar";
import SearchResults from "../../organisms/search-results/SearchResults";
import placeholderImage from "../../../assets/clues-placeholder.png";
import Pagination from "../../molecules/pagination/Pagination";

export default (): JSX.Element => {
    const [searchResult, setSearchResult] = 
        useState<HnSearchResult|undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const isEmpty = !searchResult?.hits?.length;
    const submit = submitHandler(setSearchResult, setIsLoading);
    return (
        <>
            <header className="flex flex-col sm:flex-row gap-4 my-4">
                <h1 aria-label="Hacker Clues"
                    className="uppercase tracking-widest text-3xl font-thin">
                  Hacker Clue 
                  <span aria-hidden className="text-[hotpink]">$&gt;</span>
                </h1>
                <SearchBar onSubmit={submit} />
            </header>
            <main className="mx-2 sm:mx-4">
                { isLoading ? <LoadIndicator />
                : isEmpty   ? <Empty placeholder={placeholderImage} />
                : <SearchResults results={searchResult}/>
                } 
            </main>
            {!(isLoading || isEmpty)
                ?  <footer>
                        <div>Found {searchResult.nbHits} results.</div>
                        <Pagination 
                            neighbourCount={3}
                            pageCount={Math.floor(searchResult.nbHits / searchResult.hitsPerPage)} 
                            currentPage={searchResult.page} 
                            onPageSelected={n => submit(searchResult.query, n)} />
                    </footer>
                : null} 
        </>
    );
};


type EmptyProps = { placeholder: string }
const Empty = ({placeholder}: EmptyProps): JSX.Element => 
    (<img alt="" className="opacity-10 pointer-events-none" src={placeholder} />);


type SubmitHandler = (
    setSearchResult: React.Dispatch<SetStateAction<HnSearchResult|undefined>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => (query: string, page?: number) => void;
const submitHandler: SubmitHandler = (setSearchResult, setIsLoading) => async (query, page) => {
    setIsLoading(true);
    try {
        const result = await fetchSearchResults(query, page ?? 0);
        setSearchResult(result);
    } catch (error) { 
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`🤷 What's all this then?: ${error}`);
        }
    } finally {
        setIsLoading(false);
    }
};