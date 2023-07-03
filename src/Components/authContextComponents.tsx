import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext<any>(null);

function AuthContextComponent(props: any) {
  const [loggedInUser, setLoggedInUser] = useState<string | null >(null);
  const [user, setUser] = useState()


  useEffect(() => {
    const storedToken = document.cookie 
    .split("; ")
    .find((row) => row.startsWith("Bearer="))
    ?.split("=")[1];
    
    if (storedToken) {  
      try{
        const decodedUser: any = jwtDecode(storedToken)
        setUser(decodedUser)
        setLoggedInUser(storedToken);
      } catch(err){
        console.log(err);
      }
    } else {
      setLoggedInUser(null); 
    }

 
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, user, setUser }}>
       { props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };