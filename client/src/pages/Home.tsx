import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import Spaces from '../components/Spaces/Spaces';

function Home() {
  const { isLoading } = useAuth0();

  const { user, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <div className="main-loading">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Header />
      {isAuthenticated ? <Spaces /> : <><h1>Welcome</h1></>}
    </>
  );
}

export default Home;
