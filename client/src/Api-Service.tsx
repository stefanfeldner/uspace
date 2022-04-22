import { CreateSpaceDataType, SpaceDataType } from "./interfaces/Interfaces";

const URL = process.env.REACT_APP_API;

const API_SERVICE = {
  // creates a new user_space_role and returns it
  createUserSpaceRole: async (
    user_id: number,
    space_id: number,
    role_id: number
  ) => {
    const data = {
      user_id,
      space_id,
      role_id,
    };
    const res = await fetch(URL + '/User_Space_Roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const userSpaceRole = await res.json();
    return userSpaceRole;
  },
  // finds a user by given sub and returns it
  findUserBySub: async (sub: string) => {
    const res = await fetch(URL + `/usersBySub/${sub}`);
    const fetchedUser = await res.json();
    return fetchedUser;
  },
  // creates a new space and returns it
  createSpace: async (spaceData: CreateSpaceDataType) => {
    const res = await fetch(URL + '/spaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spaceData),
    });
    const newSpace: SpaceDataType = await res.json();
    return newSpace;
  },
  // finds a space by id and returns it
  findSpaceById: async (id: string) => {
    const res = await fetch(URL + `/spaces/${id}`);
    const foundSpace = await res.json();
    return foundSpace;
  }
};

export default API_SERVICE;
