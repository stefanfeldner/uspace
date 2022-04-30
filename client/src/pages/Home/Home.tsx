import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import Spaces from './components/Spaces/Spaces';
import { CreateUserType } from '../../interfaces/Interfaces';
import { useState } from 'react';
import Welcome from './components/Welcome/Welcome';
import API_USER_SERVICE from '../../services/apiUserService';

function Home() {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const [opened, setOpened] = useState<boolean>(false);

  if (!isLoading && user) {

    const userData: CreateUserType = {
      email: user!.email!,
      email_verified: user!.email_verified!,
      username: user!.nickname!,
      picture_url: user!.picture!,
      sub: user!.sub!,
    };
    //todo creates user EVERYTIME
    API_USER_SERVICE.createUser(userData)
        .then((data) => {console.log(data)})
        .catch((err) => {console.error(err)})
  }

  //todo can be done using ? with one return
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
        <Spaces opened={opened} setOpened={setOpened} />
      ) : (
        <Welcome />
      )}
    </>
  );
}

export default Home;