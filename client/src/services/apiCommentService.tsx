import {CommentType, CreateCommentType} from '../interfaces/Interfaces';

const URL = process.env.REACT_APP_API;

// creates a single comment
const createComment = async (data: CreateCommentType): Promise<CommentType> => {
    const comment = await fetch(URL + '/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return comment.json();
}

const API_COMMENT_SERVICE = {createComment}

export default API_COMMENT_SERVICE;
