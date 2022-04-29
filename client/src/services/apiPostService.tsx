const URL = process.env.REACT_APP_API;

const API_POST_SERVICE = {
    //delete single post and comments inside
    deletePostById: async (id: number) => {
        const res = await fetch(URL + `/posts/${id}`, {
            method: 'DELETE',
        });
        const deletedPost = await res.json();
        return deletedPost;
    },
};

export default API_POST_SERVICE;
