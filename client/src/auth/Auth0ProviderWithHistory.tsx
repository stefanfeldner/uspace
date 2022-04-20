import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

// TODO: Fix TypeScript any
const Auth0ProviderWithHistory = ({ children }: any) => {
  const domain: string = process.env.REACT_APP_AUTH0_DOMAIN as string;
  const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
  
  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;