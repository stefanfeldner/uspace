export interface UserSpaceRoleType {
  user: {
    username: string;
    email: string;
    pictureUrl: string;
    id: number;
  };
}

export default interface SpaceWithCreatorType {
  id: number;
  name: string;
  createdAt: Date;
  User_Space_Role: UserSpaceRoleType[];
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  post_id: number;
  user_id: number;
}

export interface CreateCommentType {
  content: string;
  post_id: number;
  user_id: number;
}

export interface PostType {
  id: number;
  content: string;
  tags: string;
  title: string;
  user_id: number;
  space_id: number;
  createdAt: Date;
  Comment: CommentType[];
}

export interface CreatePostType {
  content: string;
  tags: string;
  title: string;
  user_id: number;
  space_id: number;
  createdAt: Date;
}

export interface SpaceDataType {
  Post: PostType[];
  createdAt: Date;
  description: string;
  id: number;
  name: string;
  User_Space_Role: UserSpaceRoleType[];
}

export interface CreateSpaceDataType {
  description: string;
  name: string;
}

export interface UserType {
  id: number;
  email: string;
  email_verified: boolean;
  username: string;
  picture_url: string;
  sub: string;
  createdAt: Date;
}

export interface CreateUserType {
  email: string;
  email_verified: boolean;
  username: string;
  picture_url: string;
  sub: string;
}

export interface PrismaError {
  code: string;
  clientVersion: string;
  meta: object;
}
