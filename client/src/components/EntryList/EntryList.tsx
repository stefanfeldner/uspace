import React, { useContext } from 'react';
import './EntryList.scss';
import Entry from '../Entry/Entry';
import { SpaceContext } from '../../pages/Space';
import { SpaceDataType } from '../../interfaces/Interfaces';

interface Incoming {
  setClickedPost: Function;
}

function EntryList(props: Incoming) {
  const spaceData = useContext<SpaceDataType[]>(SpaceContext);
  const posts = spaceData[0]?.Post;

  return (
    <div className="entry-list">
      {posts &&
        posts.map((post) => (
          <Entry
            key={post.id}
            post={post}
            setClickedPost={props.setClickedPost}
          />
        ))}
      {posts && posts.length === 0 ? (
        <div>
          <h1>Share your thoughts with the world!</h1>
          <p>By clicking on the <strong>"Post an Update"</strong> Button on the top right.</p>
        </div>
      ) : null}
    </div>
  );
}

export default EntryList;
