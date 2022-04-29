import React, { useState } from 'react';
import './CommentSection.scss';
import {
  CommentType,
  PostType,
} from '../../../../interfaces/Interfaces';
import DOMPurify from 'dompurify';
import Comment from '../Comment/Comment';
import { useAuth0 } from '@auth0/auth0-react';
import _ from 'lodash';
import API_USER_SERVICE from '../../../../services/apiUserService';
import API_COMMENT_SERVICE from '../../../../services/apiCommentService';

interface Incoming {
  clickedPost: number;
  comments: CommentType[];
  spaceOwnerId?: number;
  postId: number;
  posts: PostType[];
  setPosts: Function;
}

function CommentSection(props: Incoming) {
  const [newComment, setNewComment] = useState('');
  const comments = props.comments;
  // todo move to state
  const { user } = useAuth0();
  const URL = process.env.REACT_APP_API + '/comments';

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setNewComment(event.currentTarget.value);
  };

  // todo probably not needed as we will be using the user sub for id
  const fetchUser = async () => {
    if (user) {
      const data = await API_USER_SERVICE.findUserBySub(user.sub!);
      return data.id;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const saveComment = DOMPurify.sanitize(newComment);
    setNewComment(''); // reset input

    // prevent users from submitting whitespace and empty forms
    if (!saveComment.length || saveComment.trim() === '') return; // prevent empty submits

    if (props.postId) {
      const commentData = {
        content: saveComment,
        user_id: await fetchUser(),
        post_id: props.postId,
      };

      // post comment to DB
      API_COMMENT_SERVICE.createComment(commentData)
          .then((comment) => {
              // deep clone all posts
              const clonedPosts = _.cloneDeep(props.posts);
              // find post to add the new comment to
              const postToAddCommentTo = clonedPosts.find(
                (post) => post.id === commentData.post_id
              );

              // push comment to right post
              postToAddCommentTo?.Comment.push(comment);
              // overwrite posts state with the cloned posts incl. the new comment
              props.setPosts(clonedPosts);
          })
          .catch((error) => console.error(error))
    }
  };

  return (
    <div className="comments">
      <div className="comments-wrapper">
        {comments &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              spaceOwnerId={props.spaceOwnerId}
            />
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
          <button type="submit"/>
        </form>
      </div>
    </div>
  );
}

export default CommentSection;
