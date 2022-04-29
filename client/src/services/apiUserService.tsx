import {CreateUserType,} from '../interfaces/Interfaces';

const URL = process.env.REACT_APP_API;

// finds a user by given sub and returns it
const findUserBySub = async (sub: string) => {
    const res = await fetch(URL + `/usersBySub/${sub}`);
    return await res.json();
}
// todo will be of type string
const getUserById = async (id: number) => {
    const res = await fetch(URL + `/user/${id}`);
    return await res.json();
}
// creates a single user
const createUser = async (data: CreateUserType) => {
    await fetch(URL + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

const API_USER_SERVICE = {findUserBySub, getUserById, createUser}

export default API_USER_SERVICE;
