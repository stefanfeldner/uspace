import React, { useContext, useEffect, useState } from 'react';
import './Comment.scss';
import AvatarGirl from '../../assets/img/avatar-girl.jpg';
import { CommentType, UserType } from '../../interfaces/Interfaces';

interface Incoming {
  data: CommentType;
}

function Comment(props: Incoming) {
  const { data } = props;
  const [user, setUser] = useState<UserType>();
  const URL = `http://localhost:3001/users/${data.user_id}`;

  const date = new Date(data.created_at).toLocaleTimeString('en-EN', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  const fetchUser = async () => {
    const user = await fetch(URL);
    const data = await user.json();
    setUser(data);
    console.log(data);
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div className="comment">
      <div className="comment-avatar">
        <img src={user && user.picture_url} alt="User Avatar" />
        <div className="comment-online">&nbsp;</div>
      </div>
      <div className="comment-wrapper">
        <div className="comment-wrapper-top">
          <div className="comment-user">{user && user.username}</div>
          <div className="comment-time">{date}</div>
        </div>
        <div className="comment-message">{data.content}</div>
      </div>
    </div>
  );
}

export default Comment;
