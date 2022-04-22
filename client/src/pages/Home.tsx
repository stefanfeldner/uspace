import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import Spaces from '../components/Spaces/Spaces';
import { CreateUserType } from '../interfaces/Interfaces';
import { useState } from 'react';

function Home() {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const URL = process.env.REACT_APP_API + '/users';
  const [opened, setOpened] = useState<boolean>(false);

  // create a user if he doesn't exist
  const createUser = async (data: CreateUserType) => {
    await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  if (!isLoading && user) {
    const userData: CreateUserType = {
      email: user!.email!,
      email_verified: user!.email_verified!,
      username: user!.nickname!,
      picture_url: user!.picture!,
      sub: user!.sub!,
    };

    createUser(userData);
  }

  if (isLoading) {
    return (
      <div className="main-loading">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Header setOpened={setOpened} />
      {isAuthenticated ? (
        <Spaces opened={opened}
        setOpened={setOpened}/>
      ) : (
        <>
          <h1>Welcome</h1>
        </>
      )}
    </>
  );
}

export default Home;
