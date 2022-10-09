import React, { useState } from "react";

const debounce = (func: (...args: unknown[]) => unknown, wait: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), wait);
  };
};

type Props = {
  suggestions: Array<string>;
  getSuggestions: (query: string) => any;
  maxSuggestions?: number;
  suggestionThreshold?: number;
};

const Search = (props: Props) => {
  const {
    suggestions,
    getSuggestions,
    maxSuggestions = 5,
    suggestionThreshold = 2,
  } = props;

  const [query, setQuery] = useState<string>("");

  const debouncedGetSuggestions = debounce(
    (query) => getSuggestions(query as string),
    300
  );

  const handleSearch = (e: React.ChangeEvent) => {
    //get input value
    const query = (e.target as HTMLInputElement).value;
    setQuery(query);

    //only getSuggestions if we type enough characters
    if (query.length >= suggestionThreshold) {
      debouncedGetSuggestions(query);
    }
  };

  const determineHighlightedContent = (suggestion: string, idx: number) => {
    if (idx === 0) {
      return (
        <div key={suggestion}>
          <span className="highlight">
            {suggestion.substring(0, query.length)}
          </span>
          {suggestion.substring(query.length)}
        </div>
      );
    } else {
      return (
        <div key={suggestion}>
          {suggestion.substring(0, idx)}
          <span className="highlight">
            {suggestion.substring(idx, idx + query.length)}
          </span>
          {suggestion.substring(idx + query.length)}
        </div>
      );
    }
  };

  return (
    <div className="search-wrapper">
      <input onChange={handleSearch} className="search" type="search" />
      {suggestions.length > 0 && query.length >= suggestionThreshold && (
        <div className="suggestions">
          {suggestions.slice(0, maxSuggestions).map((suggestion) => {
            //check the index of the suggestion where the query is found
            const idx = suggestion.toLowerCase().indexOf(query.toLowerCase());
            return determineHighlightedContent(suggestion, idx);
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
