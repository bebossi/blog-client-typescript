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
        console.log(data);
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
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search..."
        className="text-slate-950"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
