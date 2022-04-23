import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useState } from 'react';
import API_SERVICE from '../../Api-Service';
import { UserType } from '../../interfaces/Interfaces';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import './Profile.scss';

const Profile = () => {
  const { user, isLoading } = useAuth0();
  const [userEmail, setUserEmail] = useState<string>();
  const [userPicture, setUserPicture] = useState<string>();
  const [userName, setUserName] = useState<string>();

  const fetchUser = async () => {
    const fetchedUser: UserType = await API_SERVICE.findUserBySub(user?.sub!);
    console.log(fetchedUser);
    setUserEmail(fetchedUser.email);
    setUserPicture(fetchedUser.picture_url);
    setUserName(fetchedUser.username);
  };

  if (!isLoading && user) fetchUser();

  return (
    <>
      <Header />
      <div className="profile">
        <div className="container">
          <h1>Profile</h1>
          <p>
            Here you can see and change your profile data like your profile picture, username and more.
          </p>
          <div className="profile-data">
            <form>
              <label>E-Mail:</label>
              <input type="text" value={userEmail} />
              <label>Profile Picture URL:</label>
              <input type="text" value={userPicture} />
              <label>Username:</label>
              <input type="text" value={userName} />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
