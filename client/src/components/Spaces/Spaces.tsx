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

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    const spaces = await fetch(url);
    const data: SpaceWithCreatorType[] = await spaces.json();

    setAllSpaces(data);
  };

  // filter out my spaces
  const mySpaces = (data: SpaceWithCreatorType[]) => {
    return data.filter((space) => {
      return space.User_Space_Role[0].user.email === user?.email;
    });
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
            <>
              <div className="spaces-row-title">Your Spaces</div>
              <div className="spaces-wrapper">
                <SpacesList
                  spaces={allSpaces && mySpaces(allSpaces)}
                  allSpaces={allSpaces}
                  setAllSpaces={setAllSpaces}
                />
              </div>
            </>
          </div>
          <div className="spaces-row">
            <div className="spaces-row-title">All Spaces</div>
            <div className="spaces-wrapper">
              <SpacesList
                spaces={allSpaces}
                allSpaces={allSpaces}
                setAllSpaces={setAllSpaces}
              />
              <SpacesList
                spaces={allSpaces}
                allSpaces={allSpaces}
                setAllSpaces={setAllSpaces}
              />
              <SpacesList
                spaces={allSpaces}
                allSpaces={allSpaces}
                setAllSpaces={setAllSpaces}
              />
              <SpacesList
                spaces={allSpaces}
                allSpaces={allSpaces}
                setAllSpaces={setAllSpaces}
              />
              <SpacesList
                spaces={allSpaces}
                allSpaces={allSpaces}
                setAllSpaces={setAllSpaces}
              />
              <SpacesList
                spaces={allSpaces}
                allSpaces={allSpaces}
                setAllSpaces={setAllSpaces}
              />
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
          setOpened={props.setOpened}
          allSpaces={allSpaces}
          setAllSpaces={setAllSpaces}
        />
      </Modal>
    </>
  );
}

export default withAuthenticationRequired(Spaces, {
  onRedirecting: () => <Loading />,
});
