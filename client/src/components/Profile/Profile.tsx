import { withAuthenticationRequired } from '@auth0/auth0-react';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import './Profile.scss';

const Profile = () => {
  return (
    <>
      <Header />
      <div className="profile">
        <div className="container">
          <h1>Profile</h1>
        </div>
      </div>
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
