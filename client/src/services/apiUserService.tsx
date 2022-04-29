import {
    CreateUserType,
} from '../interfaces/Interfaces';

const URL = process.env.REACT_APP_API;

const API_USER_SERVICE = {
    // finds a user by given sub and returns it
    findUserBySub: async (sub: string) => {
        const res = await fetch(URL + `/usersBySub/${sub}`);
        const fetchedUser = await res.json();
        return fetchedUser;
    },
    // creates a single user
    createUser: async (data: CreateUserType) => {
        await fetch(URL + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },
};

export default API_USER_SERVICE;
