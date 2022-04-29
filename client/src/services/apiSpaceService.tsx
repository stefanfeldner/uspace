import SpaceWithCreatorType, {
    CreateSpaceDataType,
    PrismaError,
    SpaceDataType,
} from '../interfaces/Interfaces';

const URL = process.env.REACT_APP_API;

const API_SPACE_SERVICE = {
    // get all spaces
    // todo handle errors in api calls? throw error?
    getSpacesAndCreators: async (): Promise<SpaceWithCreatorType[]> => {
        const spaces = await fetch(URL + '/spacesAndCreators');
        return await spaces.json();
    },

    getSpaceData: async (spaceId: string): Promise<SpaceDataType[]> => {
        const space = await fetch(URL + `/spaceData/${spaceId}`);
        return await space.json();
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
        const newSpace: SpaceDataType | PrismaError = await res.json();
        return newSpace;
    },

    //delete single space and posts/comments inside
    deleteSpaceById: async (id: number) => {
        const res = await fetch(URL + `/spaces/${id}`, {
            method: 'DELETE',
        });
        const deletedSpace = await res.json();
        return deletedSpace;
    },

    // SPACE COLLAB
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

    //delete single User_Space_role by space_id
    deleteUserSpaceRoleBySpaceId: async (space_id: number) => {
        console.log('space_id', space_id);

        const res = await fetch(URL + `/User_Space_Roles/${space_id}`, {
            method: 'DELETE',
        });
        const deletedUserSpaceRole = await res.json();
        return deletedUserSpaceRole;
    },
};

export default API_SPACE_SERVICE;
