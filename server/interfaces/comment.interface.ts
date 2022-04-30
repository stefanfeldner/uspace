export interface IComment {
  id: number,
  content: string,
  createdAt: Date,
  userId: number,
  postId: number,
}

export interface IIncomingComment {
  content: string;
  user_id: number;
  post_id: number;
}
