import { getAllEntries } from '../../../controllers/modular-routes.controller';
// import { IComment } from '../../../interfaces/comment.interface';
// import { IPost } from '../../../interfaces/post.interface';
// import { IRole } from '../../../interfaces/role.interface';
// import { ISpace } from '../../../interfaces/space.interface';
// import { IUserSpaceRole } from '../../../interfaces/user-space-role.interface';
// import { IUser } from '../../../interfaces/user.interface';
import { Request, Response } from 'express';

// type IAllTables = IComment | IPost | IRole | ISpace | IUserSpaceRole | IUser;
const tableNameList = ['Comment', 'Post', 'Space', 'User_Space_Role', 'User'];
let MOCK_TABLE_NAME;
const MOCK_ID = '3';
const MOCK_RES_ARR = [{ id: +MOCK_ID, tableName: MOCK_TABLE_NAME }, { id: +MOCK_ID + 1, tableName: MOCK_TABLE_NAME }];
// const MOCK_RES = { body: { MOCK_RES_ARR }, id: 1 };

jest.mock('../../../models/modular-routes.model', () => ({
  returnAllEntries: (tableName: string): any => {
    const tableNameIndex = tableNameList.indexOf(tableName);
    if (tableNameIndex >= 0) { return MOCK_RES_ARR; } else if (tableName === 'Role') {
      return null;
    } else { throw new Error(); }
  }
}));

describe.only('Testing Modular-Routes Controller', () => {
  it('Should send request to model and fetch all results for Comment', async () => {
    MOCK_TABLE_NAME = 'Comment';
    const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
    const mReq = MOCK_REQ as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    console.log('mReq.path.slice(1, -1)', mReq.path.slice(1, -1));
    await getAllEntries(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith(MOCK_RES_ARR);
  });
  it('Should send request to model and fetch all results for Post', async () => {
    MOCK_TABLE_NAME = 'Post';
    const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
    const mReq = MOCK_REQ as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    console.log('mReq.path.slice(1, -1)', mReq.path.slice(1, -1));
    await getAllEntries(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith(MOCK_RES_ARR);
  });
  it('Should send request to model and fetch all results for Space', async () => {
    MOCK_TABLE_NAME = 'Space';
    const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
    const mReq = MOCK_REQ as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    console.log('mReq.path.slice(1, -1)', mReq.path.slice(1, -1));
    await getAllEntries(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith(MOCK_RES_ARR);
  });
  it('Should send request to model and fetch all results for User_Space_Role', async () => {
    MOCK_TABLE_NAME = 'User_Space_Role';
    const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
    const mReq = MOCK_REQ as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    console.log('mReq.path.slice(1, -1)', mReq.path.slice(1, -1));
    await getAllEntries(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith(MOCK_RES_ARR);
  });
  it('Should send request to model and fetch all results for User', async () => {
    MOCK_TABLE_NAME = 'User';
    const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
    const mReq = MOCK_REQ as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    console.log('mReq.path.slice(1, -1)', mReq.path.slice(1, -1));
    await getAllEntries(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith(MOCK_RES_ARR);
  });
  it('Should return null if the model is passed a request for Role', async () => {
    MOCK_TABLE_NAME = 'Role';
    const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
    const mReq = MOCK_REQ as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    console.log('mReq.path.slice(1, -1)', mReq.path.slice(1, -1));
    await getAllEntries(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith(null);
  });
  it('Should return null if the model is passed a request for Role', async () => {
    MOCK_TABLE_NAME = 'WRONGPATH';
    const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
    const mReq = MOCK_REQ as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    console.log('mReq.path.slice(1, -1)', mReq.path.slice(1, -1));
    await getAllEntries(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
  });
});
