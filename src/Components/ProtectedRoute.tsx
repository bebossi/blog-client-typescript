import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute(props: any) {
  const { component: Component } = props;
  const navigate = useNavigate();
  const loggedInUser = document.cookie
  .split("; ")
  .find((row) => row.startsWith("Bearer="))
  ?.split("=")[1];
  

  useEffect(() => {
    if (!loggedInUser) {
      console.log("Acesso negado");
      navigate("/login");
    }
  }, []);

  return <Component />;
}