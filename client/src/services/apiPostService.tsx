import {CreatePostType, PostType} from '../interfaces/Interfaces';

const URL = process.env.REACT_APP_API;

//delete single post and comments inside
const deletePostById = async (id: number) => {
    const res = await fetch(URL + `/posts/${id}`, {
        method: 'DELETE',
    });
    return await res.json();
}

const createPost  = async (data: CreatePostType): Promise<PostType> => {
    const res = await fetch(URL + '/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await res.json();
}

const API_POST_SERVICE = {deletePostById, createPost}

export default API_POST_SERVICE;
