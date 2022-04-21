import React, { useEffect, useState } from 'react';
import './Comment.scss';
import { CommentType, UserType } from '../../interfaces/Interfaces';

interface Incoming {
  comment: CommentType;
  spaceOwnerId?: number;
}

function Comment(props: Incoming) {
  const { comment } = props;
  const [user, setUser] = useState<UserType>();
  const spaceOwnerId = props.spaceOwnerId || 0;
  const URL = `${process.env.REACT_APP_API}/users/${comment.user_id}`;

  const date = new Date(comment.created_at).toLocaleTimeString('en-EN', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  // get comment creator / user
  const fetchUser = async () => {
    const fetchedUser = await fetch(URL);
    const data = await fetchedUser.json();
    setUser(data);
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div className={spaceOwnerId === comment.user_id ? 'comment right' : 'comment'}>
      <div className="comment-avatar">
        <img src={user && user.picture_url} alt="User Avatar" />
        <div className="comment-online">&nbsp;</div>
      </div>
      <div className="comment-wrapper">
        <div className="comment-wrapper-top">
          <div className="comment-user">{user && user.username}</div>
          <div className="comment-time">{date}</div>
        </div>
        <div className="comment-message">{comment.content}</div>
      </div>
    </div>
  );
}

export default Comment;
