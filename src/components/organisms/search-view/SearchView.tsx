import { SetStateAction, useState } from "react";

import { fetchSearchResults, HnSearchResult } from "../../../services/hn-api";
import LoadIndicator from "../../molecules/load-indicator/LoadIndicator";
import SearchBar from "../../molecules/search-bar/SearchBar";
import SearchResults from "../search-results/SearchResults";
import placeholderImage from "../../../assets/clues-placeholder.png";


export default (): JSX.Element => {
    const [searchResult, setSearchResult] = 
        useState<HnSearchResult|undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const isEmpty = !searchResult?.hits?.length;
    return (
        <>
            <header className="flex flex-row gap-4">
                <h1 className="uppercase tracking-widest text-3xl font-thin">
                  Hacker Clues
                </h1>
                <SearchBar onSubmit={onSubmitWrapper(setSearchResult, setIsLoading)} />
            </header>
            <main>
                { isLoading ? (<LoadIndicator />)
                : isEmpty   ? (<Empty placeholder={placeholderImage} />)
                : (<SearchResults />)
                } 
            </main>
        </>
    );
};


type EmptyProps = { placeholder: string }
const Empty = ({placeholder}: EmptyProps): JSX.Element => 
    (<img alt="" className="opacity-10" src={placeholder} />);


type OnSubmitWrapper = (
    setSearchResult: React.Dispatch<SetStateAction<HnSearchResult|undefined>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => (query: string) => Promise<HnSearchResult>;

const onSubmitWrapper: OnSubmitWrapper = (setSearchResult, setIsLoading) => async query =>
{
    setIsLoading(true);
    try {
        const result = await fetchSearchResults(query);
        setSearchResult(result);
        setIsLoading(false);
        return result;
    } catch (error) { 
        // I suppose tsc can't rule out the chance that the code throws, say...
        // fish instead of Errors?
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`🤷 What's all this then?: ${error}`);
        }
    }
};
