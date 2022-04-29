import { IComment } from './comment.interface';
import { IPost } from './post.interface';
import { ISpace } from './space.interface';

export interface IStrippedUser {
  username: string, email:string, pictureUrl: string, id: number,
}

export interface IPostWithComments extends IPost{
  comments: IComment[],
}
export interface ISpaceData extends ISpace {
    posts: IPostWithComments[],
    userSpaceRoles: {user: IStrippedUser}[],
}
