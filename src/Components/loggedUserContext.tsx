import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../interfaces";
import { api } from "../api";

const UserContext = createContext<User | null>(null);

export function useUserContext() {
    return useContext(UserContext);
  }

  export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      
            async function fetchUser() {
              const response = await api.get("/profilePost");
              setUser(response.data);
            }
            if(!user){

                fetchUser();
            }
        
    }, [])
  
    return (
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    );
  }

  
  
  
  
  