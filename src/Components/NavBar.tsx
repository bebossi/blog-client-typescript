import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./authContextComponents";

function Navbar() {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);


  const handleLogout = () => {
    document.cookie = "Bearer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedInUser(null);
  };

  useEffect(() => {
  }, [loggedInUser]);
  return (
    <nav className="flex flex-col  items-center py-5 bg-gray-950 text-white min-h-screen fixed w-60">
      <div>
        <Link to="/" className="text-xl font-bold ">
          LOGO
        </Link>
        <ul className="flex flex-col space-y-20 mt-16 text-xl">
        {loggedInUser && (
            <>
              <li>
                <Link to="/profile" className= "flex gap-2 text-white hover:text-gray-300">
                <img className="h-7 w-7 bg-white rounded-full" src="/src/assets/user.png"/>  
                <p>Profile</p>
                </Link>
              </li>
              <li>
                <Link to="/chats" className="text-white hover:text-gray-300">
                 Chats
                </Link>
              </li>
              <li>
                <Link className= "flex gap-2 text-white hover:text-gray-300" to="/createPost">
                  <img className="h-6 w-6 bg-white rounded-full" src="/src/assets/plus.png"/>
                  <p>Create Post</p>
                  </Link>
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
          {!loggedInUser && (
            <>
              <li>
                <Link to="/signup" className="text-white hover:text-gray-300">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </li>
            </>
          )}
       
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
