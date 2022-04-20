import React, { useState } from 'react';
import './Entry.scss';
import { PostType } from '../../interfaces/Interfaces';

interface Incoming {
  post: PostType;
  setClickedPost: Function;
}

function Entry(props: Incoming) {
  const { post } = props;
  const [clicked, setClicked] = useState<boolean>(false);

  // format date to show MONTH DAY
  const date = new Date(post.created_at).toLocaleDateString('en-EN', {
    month: 'short',
    day: 'numeric',
  });

  // remove html tags and only allow certain character amount
  const content =
    post.content.replace(/(<([^>]+)>)/gi, '').slice(0, 90) + '...';

  const changeDetails = (id: number) => {
    props.setClickedPost(id - 1); // posts start at 1 in db - subtract one
    setClicked(prev => !prev); // TODO: only show one as active not two
  };

  return (
    <div className={clicked ? 'entry active' : 'entry'} onClick={() => changeDetails(post.id)}>
      <div className="entry-left">
        <div className="entry-left-date">{date}</div>
      </div>
      <div className="entry-right">
        <div className="entry-right-title">{post.title}</div>
        <div className="entry-right-text">{content}</div>
        {post.Comment.length > 0 && (
          <div className="entry-right-tags">
            <div className="comment-tag">{post.Comment.length} comments</div>
            {/* <div className="attachment-tag">1 attachment</div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Entry;
