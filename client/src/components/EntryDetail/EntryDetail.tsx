import './EntryDetail.scss';
import CommentSection from '../CommentSection/CommentSection';
import { PostType, SpaceDataType } from '../../interfaces/Interfaces';
import DOMPurify from 'dompurify';
import { Menu } from '@mantine/core';
import { Trash, Edit } from 'tabler-icons-react';

interface Incoming {
  clickedPost: number;
  spaceData: SpaceDataType[];
  spaceOwnerId?: number;
  posts: PostType[];
  setPosts: Function;
}

function EntryDetail(props: Incoming) {
  const post = props.posts[props.clickedPost];
  const username = props.spaceData[0]?.User_Space_Role[0]?.user?.username;
  const picture_url = props.spaceData[0]?.User_Space_Role[0]?.user?.picture_url;
  const comments = props.posts[props.clickedPost]?.Comment;
  let date = '';

  if (post) {
    date = new Date(post.created_at).toLocaleTimeString('en-EN', {
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric',
      day: '2-digit',
      month: 'short',
    });
  }

  // return empty if no posts exist
  if (!post) {
    return <></>;
  }

  const deletePost = () => {
    console.log('post deleted', post);
  };
  const editPost = () => {
    console.log('post edited', post);
  };

  return (
    <div className="entry-detail">
      <div className="entry-detail-top">
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
        <Menu placement="end">
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<Edit size={14} />} onClick={editPost}>
            Edit this post
          </Menu.Item>
          <Menu.Item color="red" icon={<Trash size={14} />} onClick={deletePost}>
            Delete this post
          </Menu.Item>
        </Menu>
      </div>
      <div className="entry-detail-content">
        <div
          className="entry-detail-title"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post && post.title),
          }}
        ></div>
        <div className="entry-detail-text">
          {post && (
            // insert rich text content
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            ></div>
          )}
        </div>
      </div>
      {post &&
        post.tags.length > 1 && ( // if tags are empty, hide this
          <div className="entry-detail-tags">
            <div className="entry-detail-tags-title">Tags</div>
            <div className="entry-detail-tags-wrapper">
              {post &&
                // slice off last whitespace and split tags into array
                post.tags
                  .slice(0, -1)
                  .split(',')
                  .map((tag) => {
                    return (
                      <div key={tag} className="tag done">
                        {tag}
                      </div>
                    );
                  })}
            </div>
          </div>
        )}
      <div className="entry-detail-comments">
        <div className="entry-detail-comments-title">Comments</div>
        <div className="entry-detail-comments-wrapper">
          <CommentSection
            comments={comments}
            postId={post.id}
            posts={props.posts}
            setPosts={props.setPosts}
            clickedPost={props.clickedPost}
            spaceOwnerId={props.spaceOwnerId}
          />
        </div>
      </div>
    </div>
  );
}

export default EntryDetail;
