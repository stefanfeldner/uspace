import { Request, Response } from 'express';
import { postUserSpaceRole } from '../../../controllers/user-space-role.controller';
import { IIncomingUserSpaceRole } from '../../../interfaces/user-space-role.interface';

// Mock data
// For creating UserSpaceRole
const MOCK_REQ_POST_USERSPACEROLE: {body: IIncomingUserSpaceRole} = { body: { user_id: 1, space_id: 2, role_id: 1 } };
const MOCK_RES_POST_USERSPACEROLE = { ...MOCK_REQ_POST_USERSPACEROLE.body, id: 7 };
jest.mock('../../../models/user-space-role.model', () => ({
  createUserSpaceRole: (userSpaceRoleDetails: IIncomingUserSpaceRole) : any => {
    if (userSpaceRoleDetails === MOCK_REQ_POST_USERSPACEROLE.body) {
      return MOCK_RES_POST_USERSPACEROLE;
    } else {
      throw new Error();
    }
  }
}));
// For returning spaces and creators
// For deleting a UserSpaceRole

describe('Testing UserSpaceRole Controller', () => {
  // Tests for PostUserSpaceRole function
  test('Should send UserSpaceRole data in request to model and return the saved UserSpaceRole', async () => {
    const mReq = MOCK_REQ_POST_USERSPACEROLE as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await postUserSpaceRole(mReq, mRes);
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.send).toBeCalledWith(MOCK_RES_POST_USERSPACEROLE);
  });

  test('Should handle errors thrown by the model when creating a new UserSpaceRole', async () => {
    const mReq = { body: {} } as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await postUserSpaceRole(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
  });

  // Tests for returning spaces and their creators
  // test('Should return all spaces and their creators from model', async () => {
  //   // //test goes here
  // });

  // test('Should handle errors thrown by the model when requesting all spaces and their creators from model', async () => {
  //   // //test goes here
  // });

  // Tests for deleting a single UserSpaceRole by spaceId
  // test('Should send spaceId from request params in request to model and return the deleted row data', async () => {
  //   // //test goes here
  // });

  // test('Should handle errors thrown by the model when deleting an item in UserSpaceRole table', async () => {

  // });
});
