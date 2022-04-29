import React, { useEffect, useState } from 'react';
import './Comment.scss';
import { CommentType, UserType } from '../../../../interfaces/Interfaces';
import DOMPurify from 'dompurify';
import API_USER_SERVICE from '../../../../services/apiUserService';

interface Incoming {
  comment: CommentType;
  spaceOwnerId?: number;
}

function Comment(props: Incoming) {
  const { comment } = props;
  const [user, setUser] = useState<UserType>();
  // todo wtf is this 0?
  const spaceOwnerId = props.spaceOwnerId || 0;

  const date = new Date(comment.created_at).toLocaleTimeString('en-EN', {
    // weekday: 'short',
    year: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  // get comment creator / user
  useEffect(() => {
    API_USER_SERVICE.getUserById(comment.user_id)
        .then((userData) => {
           setUser(userData);
        })
  }, [comment]);

  return (
    <div
      className={spaceOwnerId === comment.user_id ? 'comment right' : 'comment'}
    >
      <div className="comment-avatar">
        <img src={user && user.picture_url} alt="User Avatar" />
        <div className="comment-online">&nbsp;</div>
      </div>
      <div className="comment-wrapper">
        <div className="comment-wrapper-top">
          <div className="comment-user">{user && user.username}</div>
          <div className="comment-time">{date}</div>
        </div>
        <div
          className="comment-message"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(comment.content),
          }}
        />
      </div>
    </div>
  );
}

export default Comment;
