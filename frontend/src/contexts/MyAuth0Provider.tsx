import { Auth0Provider } from "@auth0/auth0-react";

interface props {
  children: JSX.Element;
}

function MyAuth0Provider({ children }: props): JSX.Element {
  const domain: string = process.env.REACT_APP_AUTH0_DOMAIN as string;
  const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
  const audience: string = process.env.REACT_APP_AUTH0_API_AUDIENCE as string;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={`${window.location.origin}/dashboard`}
      cacheLocation={"localstorage"}
      useRefreshTokens
    >
      {children}
    </Auth0Provider>
  );
}

export default MyAuth0Provider;
