import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import EntryList from '../components/EntryList/EntryList';
import EntryDetail from '../components/EntryDetail/EntryDetail';
import CreateEntryForm from '../components/CreateEntryForm/CreateEntryForm';
import { Modal } from '@mantine/core';
import Loading from '../components/Loading/Loading';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { PostType, SpaceDataType } from '../interfaces/Interfaces';

function Space() {
  const [opened, setOpened] = useState<boolean>(false);
  const [spaceData, setSpaceData] = useState<SpaceDataType[]>([]);
  const [clickedPost, setClickedPost] = useState<number>(0);
  const spaceId = useParams().id; // returns id of current space
  const [posts, setPosts] = useState<PostType[]>([]);
  const [spaceOwnerId, setSpaceOwnerId] = useState<number>();

  const { isLoading } = useAuth0();
  const url = process.env.REACT_APP_API + `/spaceData/${spaceId}`;

  useEffect(() => {
    fetchSpaceData();
  }, []);

  const fetchSpaceData = async () => {
    try {
      const data = await fetch(url);
      const spaces: SpaceDataType[] = await data.json();
      setSpaceData(spaces);
      setPosts(spaces[0].Post);
      setSpaceOwnerId(spaces[0].User_Space_Role[0].user.id);
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
      <Header setOpened={setOpened} spaceOwnerId={spaceOwnerId} />
      <main className="main">
        <div className="container">
          <div className="main-wrapper">
            <div className="main-left">
              {posts && (
                <EntryList posts={posts} setClickedPost={setClickedPost} />
              )}
            </div>
            <div className="main-right">
              {spaceData && (
                <EntryDetail
                  posts={posts}
                  setPosts={setPosts}
                  spaceData={spaceData}
                  clickedPost={clickedPost}
                  spaceOwnerId={spaceOwnerId}
                />
              )}
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
        <CreateEntryForm
          setPosts={setPosts}
          setOpened={setOpened}
          space_id={spaceData && spaceData[0]?.id}
          user_id={spaceData && spaceData[0]?.User_Space_Role[0].user.id}
        />
      </Modal>
    </>
  );
}

export default withAuthenticationRequired(Space, {
  onRedirecting: () => <Loading />,
});
