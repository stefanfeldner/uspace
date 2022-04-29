import { useState } from 'react';
import './Header.scss';
import logo from '../../assets/img/logo-uspace.svg';
import avatarDude from '../../assets/img/avatar-dude.jpg';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton/LoginButton';
import SignupButton from '../SignupButton/SignupButton';
import { useLocation } from 'react-router';
import API_SERVICE from '../../Api-Service';
import { Menu } from '@mantine/core';
import { Logout, User } from 'tabler-icons-react';
import { useNavigate } from "react-router-dom";

interface Incoming {
  setOpened?: Function;
  spaceOwnerId?: number;
}

function Header(props: Incoming) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const path = useLocation().pathname;
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { logout } = useAuth0();
  const navigate = useNavigate();

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

  const logOut = () => {
    logout({
      returnTo: window.location.origin,
    });
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
          <Menu
            placement="end"
            control={
              <img src={user ? user.picture : avatarDude} alt="Username" />
            }
          >
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<User size={16} />} onClick={() => navigate('/profile')}>
              Profile
            </Menu.Item>
            <Menu.Item color="red" icon={<Logout size={16} />} onClick={(logOut)}>
              Log Out
            </Menu.Item>
          </Menu>
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
              <img src={logo} alt="uspace Logo" />
            </a>
          </div>
          <div className="header-right">{renderButton()}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
