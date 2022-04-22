import { CreateSpaceDataType, SpaceDataType } from "./interfaces/Interfaces";

const URL = process.env.REACT_APP_API;

const API_SERVICE = {
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
  findUserBySub: async (sub: string) => {
    const res = await fetch(URL + `/usersBySub/${sub}`);
    const fetchedUser = await res.json();
    return fetchedUser;
  },
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
  findSpaceById: async (id: string) => {
    const res = await fetch(URL + `/spaces/${id}`);
    const foundSpace = await res.json();
    return foundSpace;
  }
};

export default API_SERVICE;
