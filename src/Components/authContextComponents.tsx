import { createContext, useState, useEffect } from "react";


const AuthContext = createContext<any>(null);

function AuthContextComponent(props: any) {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("Bearer="))
    ?.split("=")[1];

    if (storedToken) {  
      setLoggedInUser(storedToken);
    } else {
      setLoggedInUser(null);
    }

  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
       { props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };