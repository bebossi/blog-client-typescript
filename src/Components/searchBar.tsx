import { useState, useEffect } from 'react';
import { api } from '../api';
import { User, Post } from '../interfaces';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[] | Post[]>([]);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/search?query=${encodeURIComponent(searchQuery)}`);
      const data = response.data;
      setSearchResults(data);
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    handleSearch(); // Trigger search when searchQuery changes
  }, []);

  console.log('Search Query:', searchQuery); 
  console.log('Search Results:', searchResults);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search..."
        className='text-slate-950'
      />
      
       <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;