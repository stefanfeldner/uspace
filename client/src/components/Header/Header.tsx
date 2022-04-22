import { useState } from 'react';
import './Header.scss';
import logo from '../../assets/img/logo-uspace.svg';
import avatarDude from '../../assets/img/avatar-dude.jpg';
import AuthenticationButton from '../AuthenticationButton/AuthenticationButton';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton/LoginButton';
import SignupButton from '../SignupButton/SignupButton';
import { useLocation } from 'react-router';
import API_SERVICE from '../../Api-Service';

interface Incoming {
  setOpened?: Function;
  spaceOwnerId?: number;
}

function Header(props: Incoming) {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const path = useLocation().pathname;
  const [isOwner, setIsOwner] = useState<boolean>(false);

  // check if current user is owner of current space
  const getUser = async () => {
    if (user) {
      // get user by sub
      const foundUser = await API_SERVICE.findUserBySub(user.sub!);
      // check if user is owner
      if (props.spaceOwnerId === foundUser.id) setIsOwner(true);
    }
  };

  if (!isLoading) getUser();

  const showMenu = (): void => {
    setMenuVisibility((prev) => !prev);
  };

  const renderButton = () => {
    if (isAuthenticated) {
      return (
        <>
          {path === '/' || path === '/spaces' ? (
            <button
              onClick={() => {
                if (props.setOpened) props.setOpened(true);
              }}
            >
              Create a Space
            </button>
          ) : (
            isOwner && (
              // if user is not creator of space, hide button
              <button
                onClick={() => {
                  if (props.setOpened) props.setOpened(true);
                }}
              >
                Post an Update
              </button>
            )
          )}
          <img
            onClick={showMenu}
            src={user ? user.picture : avatarDude}
            alt="Username"
          />
        </>
      );
    } else {
      return (
        <>
          <LoginButton />
          <SignupButton />
        </>
      );
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper">
          <div className="header-left">
            <a href="/">
              <img src={logo} alt="Wepanion Logo" />
            </a>
          </div>
          <div className="header-right">{renderButton()}</div>
          <div
            className={menuVisibility ? 'header-menu visible' : 'header-menu'}
          >
            <div className="header-menu-profile">
              <a href="#profile">Profile</a>
            </div>
            <div className="header-menu-log-buttons">
              <AuthenticationButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
