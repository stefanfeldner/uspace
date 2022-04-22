import './Spaces.scss';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import SpacesList from '../SpacesList/SpacesList';
import SpaceWithCreatorType from '../../interfaces/Interfaces';
import { Modal } from '@mantine/core';
import CreateSpaceForm from '../CreateSpaceForm/CreateSpaceForm';

interface Incoming {
  opened: boolean;
  setOpened: Function;
}

function Spaces(props: Incoming) {
  const { isLoading, user } = useAuth0();
  const url = process.env.REACT_APP_API + '/spacesAndCreators';
  const [allSpaces, setAllSpaces] = useState<SpaceWithCreatorType[]>([]);
  const [mySpaces, setMySpaces] = useState<SpaceWithCreatorType[]>([]);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    const spaces = await fetch(url);
    const data: SpaceWithCreatorType[] = await spaces.json();

    setAllSpaces(data);

    const mySpaces = data.filter((space) => {
      return space.User_Space_Role[0].user.email === user?.email;
    });

    setMySpaces(mySpaces);
  };

  if (isLoading) {
    return (
      <div className="main-loading">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="spaces">
        <div className="container">
          <div className="spaces-row">
            {mySpaces.length > 0 && (
              <>
                <div className="spaces-row-title">Your Spaces</div>
                <div className="spaces-wrapper">
                  <SpacesList spaces={mySpaces} />
                </div>
              </>
            )}
          </div>
          <div className="spaces-row">
            <div className="spaces-row-title">All Spaces</div>
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
      <Modal
        centered
        size="lg"
        opened={props.opened}
        onClose={() => props.setOpened(false)}
        title="Create a Space"
      >
        <CreateSpaceForm
          setAllSpaces={setAllSpaces}
          setOpened={props.setOpened}
          allSpaces={allSpaces}
          mySpaces={mySpaces}
          setMySpaces={setMySpaces}
        />
      </Modal>
    </>
  );
}

export default withAuthenticationRequired(Spaces, {
  onRedirecting: () => <Loading />,
});
