import React, { useState } from 'react';
import './Header.scss';
import logo from '../../assets/img/logo-uspace.svg';
import avatarDude from '../../assets/img/avatar-dude.jpg';
import AuthenticationButton from '../AuthenticationButton/AuthenticationButton';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton/LoginButton';
import SignupButton from '../SignupButton/SignupButton';

interface Incoming {
  setOpened?: Function;
}

function Header(props: Incoming) {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  const showMenu = (): void => {
    setMenuVisibility((prev) => !prev);
  };

  const renderButton = () => {
    if (isAuthenticated) {
      return (
        <>
          <button
            onClick={() => {
              if (props.setOpened) props.setOpened(true);
            }}
          >
            Create a Ticket
          </button>
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
