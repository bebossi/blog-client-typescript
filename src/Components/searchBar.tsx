import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const response = await api.get(`/search?query=${encodeURIComponent(searchQuery)}`);
        const data = response.data;
        navigate('/search-results', { state: { searchResults: data } });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mt-6 ml-2 mr-2 flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search..."
        className="text-slate-950 rounded-2xl mr-2 p-1"
      />
      <button onClick={handleSearch}> <img className="h-9 w-9 p-1 bg-white rounded-s-2xl" src="/src/assets/search.png" /> </button>
    </div>
  );
}

export default SearchBar;
