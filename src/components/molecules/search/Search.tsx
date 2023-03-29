import { useState } from "react";
import { Procedure as Action } from "../../../types/util";

export default ({onSubmit}: {onSubmit: Action<String>}) => {
    const [query, setQuery] = useState("");
    return (
        <form 
            className="flex"
            onSubmit={e => {
                onSubmit(query);
                e.preventDefault();
            }}>
            <input 
                type="search" 
                placeholder="Search"
                value={query} 
                autoFocus={true}
                onChange={e => setQuery(e.currentTarget.value)}
                className="
                    text-slate-100 bg-transparent border-slate-100 
                    border-[1px] rounded-full px-2 py-1 pr-8 "
            />
            <button 
                type="submit" 
                aria-label="Search"
                    className="-translate-x-6"
            >🔎</button>
        </form>
    );
};