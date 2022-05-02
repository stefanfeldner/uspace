import { Post } from '@prisma/client';

export interface IPost {
  id: number,
  title: string,
  tags: string,
  createdAt: Date,
  content: string,
  userId: number,
  spaceId: number,
}

export interface IIncomingPost extends Omit<Post, 'id'|'created_at'> {}
