import React, { useContext } from 'react';
import './EntryList.scss';
import Entry from '../Entry/Entry';
import { SpaceContext } from '../../pages/Space';
import { SpaceDataType } from '../../interfaces/Interfaces';

function EntryList() {
  const spaceData = useContext<SpaceDataType[]>(SpaceContext);
  const posts = spaceData[0]?.Post;

  return (
    <div className="entry-list">
      {posts && posts.map(post => <Entry key={post.id} post={post} />)}
      {posts && posts.length === 0 ? <h1>No posts yet! :(</h1> : null}
    </div>
  );
}

export default EntryList;
