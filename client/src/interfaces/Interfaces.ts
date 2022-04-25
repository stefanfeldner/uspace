export interface UserSpaceRoleType {
  user: {
    username: string;
    email: string;
    picture_url?: string;
    id?: number;
  };
}

export default interface SpaceWithCreatorType {
  id: number;
  name: string;
  created_at: Date;
  User_Space_Role: UserSpaceRoleType[];
}

export interface CommentType {
  id: number;
  content: string;
  created_at: string;
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
  created_at: Date;
  Comment: CommentType[];
}

export interface CreatePostType {
  content: string;
  tags: string;
  title: string;
  user_id: number;
  space_id: number;
  created_at: Date;
}

export interface SpaceDataType {
  Post: PostType[];
  created_at: Date;
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
  created_at: Date;
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
