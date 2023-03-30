import { 
    useRef, 
    useState,
    MutableRefObject,
    FormEvent, 
} from "react";
import { Search, Search as SearchIcon } from 'react-feather';

import { Action } from "../../../types/util";

type SearchProps = {onSubmit: Action<String>};
type InputRef = MutableRefObject<HTMLInputElement | null>;
type OnSubmitWrapper = Action<FormEvent<HTMLFormElement>>;

export default ({onSubmit}: SearchProps) => {
    const [query, setQuery] = useState("");
    const inputRef: InputRef = useRef(null);
    const onSubmitWrapper: OnSubmitWrapper = e => {
        if (inputRef.current) {
            const input = inputRef.current;
            onSubmit(input.value);
            input.focus();
            input.select();
        }
    }
    return (
        <form className="flex" onSubmit={onSubmitWrapper}>
            <input 
                type="search" 
                placeholder="Search"
                ref={inputRef}
                value={query} 
                autoFocus={true}
                onChange={e => setQuery(e.currentTarget.value)}
                className="
                    text-slate-100 bg-transparent border-slate-100 
                    border-[1px] rounded-full px-2 py-1 pr-8 "
            />
            <button type="submit" aria-label="Search" className="-translate-x-6">
                <SearchIcon />
            </button>
        </form>
    );
};