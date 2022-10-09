import { useState } from "react";
import Search from "./components/Search";

const fetchSuggestions = async (query: string) => {
  const res = await fetch("../data.json");
  const data: Array<string> = await res.json();
  return data.filter((vergoeding) =>
    vergoeding.toLowerCase().includes(query.toLowerCase())
  );
};

function App() {
  const [suggestions, setSuggestions] = useState<Array<string>>([]);

  const handleGetSuggestions = async (query: string) => {
    console.log("x");
    const suggestionsFromAPI = await fetchSuggestions(query);
    setSuggestions(suggestionsFromAPI);
  };

  return (
    <div className="container">
      <Search suggestions={suggestions} getSuggestions={handleGetSuggestions} />
    </div>
  );
}

export default App;
