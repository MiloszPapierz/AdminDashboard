import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

const LogoutButton = (): JSX.Element | null => {
  const { user, logout } = useAuth0();

  const handleLogout = useCallback(() => {
    logout({
      returnTo: window.location.origin,
    });
  }, [logout]);

  if (user) {
    return (
      <button
        className="bg-sky-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
        data-cy="logout_btn"
      >
        Log Out
      </button>
    );
  }

  return null;
};

export default LogoutButton;
