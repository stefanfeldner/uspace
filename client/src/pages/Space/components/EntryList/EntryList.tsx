import './EntryList.scss';
import EntryListItem from '../EntryListItem/EntryListItem';
import { PostType } from '../../../../interfaces/Interfaces';
import { useState } from 'react';

interface Incoming {
  setClickedPost: Function;
  posts: PostType[];
}

function EntryList(props: Incoming) {
  const posts = props.posts;
  const [activePostId, setActivePostId] = useState<number>(0);

  return (
    <div className="entry-list">
      {posts &&
        posts.length > 0 &&
        posts.map((post, index) => {
          return (
            <EntryListItem
              index={index}
              key={post.id}
              post={post}
              setClickedPost={props.setClickedPost}
              activePostId={activePostId}
              setActivePostId={setActivePostId}
            />
          );
        })}
      {posts && posts.length === 0 ? (
        <div>
          <h1>Share your thoughts with the world!</h1>
          <p>
            By clicking on the <strong>"Post an Update"</strong> Button on the
            top right.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default EntryList;
