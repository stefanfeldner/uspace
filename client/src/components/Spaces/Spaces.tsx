import './Spaces.scss';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import SpacesList from '../SpacesList/SpacesList';
import SpaceWithCreatorType from '../../interfaces/Interfaces';

function Spaces() {
  const { isLoading, user } = useAuth0();
  const url = 'http://localhost:3001/spacesAndCreators';
  const [allSpaces, setAllSpaces] = useState<SpaceWithCreatorType[]>([]);
  const [mySpaces, setMySpaces] = useState<SpaceWithCreatorType[]>([]);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    const spaces = await fetch(url);
    const data: SpaceWithCreatorType[] = await spaces.json();
    console.log(data);
    
    setAllSpaces(data);

    const mySpaces = data.filter(space => {
      return space.User_Space_Role[0].user.email === user?.email;
    })

    setMySpaces(mySpaces)
  };

  if (isLoading) {
    return (
      <div className="main-loading">
        <Loading />
      </div>
    );
  }

  return (
    <div className="spaces">
      <div className="container">
        <div className="spaces-row">
          <div className='spaces-row-title'>Your Spaces</div>
          <div className="spaces-wrapper">
            <SpacesList spaces={mySpaces} />
          </div>
        </div>
        <div className="spaces-row">
          <div className='spaces-row-title'>All Spaces</div>
          <div className="spaces-wrapper">
            <SpacesList spaces={allSpaces} />
            <SpacesList spaces={allSpaces} />
            <SpacesList spaces={allSpaces} />
            <SpacesList spaces={allSpaces} />
            <SpacesList spaces={allSpaces} />
            <SpacesList spaces={allSpaces} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticationRequired(Spaces, {
  onRedirecting: () => <Loading />,
});
