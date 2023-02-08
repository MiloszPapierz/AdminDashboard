import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

const LoginButton = (): JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = useCallback(async () => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return (
    <button
      onClick={handleLogin}
      className="text-white bg-sky-blue w-full py-3 mb-4 font-normal rounded-md self-center"
    >
      Log In
    </button>
  );
};

export default LoginButton;
