import React, { useEffect, useState, createContext } from 'react';
import Header from '../components/Header/Header';
import EntryList from '../components/EntryList/EntryList';
import EntryDetail from '../components/EntryDetail/EntryDetail';
import CreateEntryForm from '../components/CreateEntryForm/CreateEntryForm';
import { Modal } from '@mantine/core';
import Loading from '../components/Loading/Loading';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { SpaceDataType } from '../interfaces/Interfaces';

export const SpaceContext = createContext<SpaceDataType[]>([]);

function Space() {
  const [opened, setOpened] = useState(false);
  // TODO: Fix it to only work with posts inside a space not with all in the db
  const [spaceData, setSpaceData] = useState<SpaceDataType[]>([]);
  const { isLoading } = useAuth0();
  const [clickedPost, setClickedPost] = useState<number>(0);
  const spaceId = useParams().id; // returns number of current space
  const url = `http://localhost:3001/spaceData/${spaceId}`;

  useEffect(() => {
    fetchSpaceData();
  }, []);

  const fetchSpaceData = async () => {
    try {
      const spaces = await fetch(url);
      const data: SpaceDataType[] = await spaces.json();
      setSpaceData(data);
    } catch (error) {
      console.error(error);
    }
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
      <SpaceContext.Provider value={spaceData}>
        <Header setOpened={setOpened} />
        <main className="main">
          <div className="container">
            <div className="main-wrapper">
              <div className="main-left">
                {spaceData && <EntryList setClickedPost={setClickedPost} />}
              </div>
              <div className="main-right">
                {spaceData && <EntryDetail clickedPost={clickedPost} />}
              </div>
            </div>
          </div>
        </main>
        <Modal
          centered
          size="lg"
          opened={opened}
          onClose={() => setOpened(false)}
          title="Post an Update"
        >
          <CreateEntryForm setOpened={setOpened} />
        </Modal>
      </SpaceContext.Provider>
    </>
  );
}

export default withAuthenticationRequired(Space, {
  onRedirecting: () => <Loading />,
});
