import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import Loader from "../Loader";

interface props {
  children: JSX.Element;
}

const RequireAuth = ({ children }: props): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader loading={true} />;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/" />;
};

export default RequireAuth;
