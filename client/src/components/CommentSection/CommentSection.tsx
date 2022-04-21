import React, { useState } from 'react';
import './CommentSection.scss';
import { CommentType } from '../../interfaces/Interfaces';
import DOMPurify from 'dompurify';
import Comment from '../Comment/Comment';

interface Incoming {
  clickedPost: number;
  comments: CommentType[];
  spaceOwnerId?: number;
}

function CommentSection(props: Incoming) {
  const [newComment, setNewComment] = useState('');
  const comments = props.comments;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newComment.length) return; // prevent empty submits
    setNewComment('');
    const saveComment = DOMPurify.sanitize(newComment);
    // TODO: Post comment to DB
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setNewComment(event.currentTarget.value);
  };

  return (
    <div className="comments">
      <div className="comments-wrapper">
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} spaceOwnerId={props.spaceOwnerId} />
          ))}
      </div>
      <div className="comments-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={handleInput}
            name="comment"
          />
          <button type="submit"></button>
        </form>
      </div>
    </div>
  );
}

export default CommentSection;
