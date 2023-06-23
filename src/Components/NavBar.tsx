import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./authContextComponents";
import SearchBar from "./searchBar";

function Navbar() {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const handleLogout = () => {
  
    document.cookie = "Bearer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedInUser(null);
  };

  return (
    <nav className="flex flex-col  items-center py-4 bg-gray-950 text-white min-h-screen fixed w-48">
    <Link to="/" className="text-xl font-bold mb-4">Logo</Link>
    <ul className="flex flex-col space-y-4">
      {!loggedInUser && (
        <>
          <li>
            <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
          </li>
        </>
      )}
      {loggedInUser && (
        <>

          <li>
            <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
          </li>
          <li>
            <Link to="/createPost">Create Post</Link>
          </li>
          <SearchBar/>
          <li>
            <button
              className="text-white hover:text-gray-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </>
      )}
    </ul>
  </nav>
  );
}

export default Navbar;
