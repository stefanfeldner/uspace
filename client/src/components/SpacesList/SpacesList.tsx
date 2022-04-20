import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import './SpacesList.scss';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import SpaceWithCreatorType from '../../interfaces/Interfaces';
import IconAttachment from '../../assets/img/icon-attachment-white.svg';
import { Link } from 'react-router-dom';

interface Incoming {
  spaces: SpaceWithCreatorType[];
}

function SpacesList(props: Incoming) {
  const spaceItem = props.spaces.map((space) => {
    const { username } = space.User_Space_Role[0].user;
    const { name } = space;
    const { id } = space;

    return (
      <Link to={`/spaces/${id}`} key={id} className="spaces-item">
        <img src={IconAttachment} alt="Space Icon" />
        <div className="spaces-item-name">{name}</div>
        <div className="spaces-item-creator">{username}</div>
      </Link>
    );
  });

  return <>{spaceItem}</>;
}

export default withAuthenticationRequired(SpacesList, {
  onRedirecting: () => <Loading />,
});
