import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./authContextComponents";

function Navbar() {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const handleLogout = () => {
  
    document.cookie = "Bearer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedInUser(null);
  };

  return (
    <nav className="flex justify-between items-center py-4 bg-gray-900 text-white">
      <Link to="/" className="text-xl font-bold">Logo</Link>
      <ul className="flex space-x-4">
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
