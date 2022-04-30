import { CustomError } from '../error-handling/custom-err.class';
import { IComment, IIncomingComment } from '../interfaces/comment.interface';
import { createCommentQuery } from '../queries/comment.queries';

// creates a single comment
export const createComment = async (commentDetails: IIncomingComment): Promise<IComment> => {
  try {
    const comment = await createCommentQuery(commentDetails);
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.created_at,
      userId: comment.user_id,
      postId: comment.post_id
    };
  } catch (error) {
    console.log('Error in createComment', error);
    throw new CustomError('A database error has occurred.');
  }
};
