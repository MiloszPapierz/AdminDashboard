import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";

const LoginPage = (): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated && !isLoading) {
    return <Navigate to="dashboard" />;
  }

  return (
    <div className="bg-white w-full min-h-screen flex items-center justify-center">
      <div className="bg-light-grey rounded-md px-3 xsm:px-6 h-96">
        <div className="flex flex-col h-full">
          <div className="flex justify-between w-56 xsm:w-72 md:w-80 items-center pt-4">
            <h1 className="text-sky-blue text-xl xsm:text-2xl md:text-3xl font-bold">
              # DASHBOARD
            </h1>
            <h1 className="text-2xl font-bold">Sign In</h1>
          </div>
          <div className="h-full flex">
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
