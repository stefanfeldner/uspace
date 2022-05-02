export interface UserSpaceRoleType {
  user: {
    username: string;
    email: string;
    pictureUrl?: string;
    id?: number;
  };
}

export default interface SpaceWithCreatorType {
  id: number;
  name: string;
  createdAt: Date;
  userSpaceRole: UserSpaceRoleType[];
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
  user_id: number;
}

export interface CreateCommentType {
  content: string;
  postId: number;
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
  userSpaceRole: UserSpaceRoleType[];
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
  pictureUrl: string;
  sub: string;
  createdAt: Date;
}

export interface CreateUserType {
  email: string;
  email_verified: boolean;
  username: string;
  pictureUrl: string;
  sub: string;
}

export interface PrismaError {
  code: string;
  clientVersion: string;
  meta: object;
}
