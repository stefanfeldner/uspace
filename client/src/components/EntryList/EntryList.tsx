import './EntryList.scss';
import Entry from '../Entry/Entry';
import { PostType } from '../../interfaces/Interfaces';

interface Incoming {
  setClickedPost: Function;
  posts: PostType[];
}

function EntryList(props: Incoming) {
  const posts = props.posts;

  // console.log(posts);

  return (
    <div className="entry-list">
      {posts &&
        posts.length > 0 &&
        posts.map((post, index) => {
          return (
            <Entry
              index={index}
              key={post.id}
              post={post}
              setClickedPost={props.setClickedPost}
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
