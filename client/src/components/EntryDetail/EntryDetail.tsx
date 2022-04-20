import React, { useContext } from 'react';
import './EntryDetail.scss';
import AvatarHoodie from '../../assets/img/avatar-hoodie.jpg';
import CommentSection from '../CommentSection/CommentSection';
import { SpaceContext } from '../../pages/Space';
import { SpaceDataType } from '../../interfaces/Interfaces';
import DOMPurify from 'dompurify';

function EntryDetail() {
  const spaceData = useContext<SpaceDataType[]>(SpaceContext);
  const currentPostId: number = 0; // show first post by default
  const post = spaceData[0]?.Post[currentPostId];
  const username = spaceData[0]?.User_Space_Role[0]?.user?.username;
  const picture_url = spaceData[0]?.User_Space_Role[0]?.user?.picture_url;
  let date = '';
  
  if (post) {
    date = new Date(post.created_at).toLocaleTimeString('en-EN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className="entry-detail">
      <div className="entry-detail-creator">
        <img
          className="entry-detail-creator-avatar"
          src={picture_url}
          alt="Avatar User"
        />
        <div className="entry-detail-creator-info">
          <div className="name">{username}</div>
          <div className="time">{date}</div>
        </div>
      </div>
      <div className="entry-detail-content">
        <div className="entry-detail-title">{post && post.title}</div>
        <div className="entry-detail-text">
          {post && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            ></div>
          )}
        </div>
      </div>
      <div className="entry-detail-tags">
        <div className="entry-detail-tags-title">Tags</div>
        <div className="entry-detail-tags-wrapper">
          {post && post.tags.split(',').map(tag => <div key={tag} className='tag done'>{tag}</div>) }
          {/* <div className="tag waiting">Waiting for Support</div>
          <div className="tag not-assigned">Not assigned</div>
          <div className="tag done">Done</div>
          <div className="tag important">Important</div>
          <div className="tag assigned">Assigned to: Stefan</div> */}
        </div>
      </div>
      <div className="entry-detail-comments">
        <div className="entry-detail-comments-title">Comments</div>
        <div className="entry-detail-comments-wrapper">
          <CommentSection />
        </div>
      </div>
    </div>
  );
}

export default EntryDetail;
