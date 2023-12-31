import { useEffect, useRef, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { Search } from "../interfaces";

function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSearches, setLastSearches] = useState<Search[]>([]);
  const [showLastSearches, setShowLastSearches] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowLastSearches(false);
      }
    };

    const handleGlobalClick = (event: MouseEvent) => {
      handleClickOutside(event);
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [searchInputRef]);

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await api.get(
          `/search?query=${encodeURIComponent(searchQuery)}`
        );
        const data = response.data;
        navigate("/search-results", { state: { searchResults: data } });
        setSearchQuery("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const getLastSearch = async () => {
      const response = await api.get("/searchHistory");
      setLastSearches(response.data);
    };

    getLastSearch();
  }, []);

  const handleLastSearchClick = async (clickedSearch: string) => {
    try {
      const response = await api.get(
        `/search?query=${encodeURIComponent(clickedSearch)}`
      );
      const data = response.data;
      navigate("/search-results", { state: { searchResults: data } });
      setSearchQuery("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputClick = () => {
    setShowLastSearches(!showLastSearches);
  };

  return (
    <div className="mt-6 mr-4 flex flex-col ">
      <div className="flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search..."
          className="text-slate-950 rounded-2xl mr-2 p-1"
          onClick={handleInputClick}
          ref={searchInputRef}
        />
        <button onClick={handleSearch}>
          <img
            className="h-9 w-9 p-1 bg-white rounded-s-2xl"
            src="/src/assets/search.png"
            alt="Search"
          />
        </button>
      </div>
      <div>
        {showLastSearches && (
          <div className="border-solid border-white border rounded-md px-3">
            {lastSearches.map((lastSearch) => (
              <p
                key={lastSearch.id}
                onClick={() => handleLastSearchClick(lastSearch.search)}
                className="pb-1"
              >
                {lastSearch.search}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
