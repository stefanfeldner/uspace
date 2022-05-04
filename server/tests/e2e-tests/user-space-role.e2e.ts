import { server, app } from '../../index';
import { prisma } from '../../prisma/prisma-client';
import request from 'supertest';
import { addMockSpace, addMockUser } from './helpers';

export const userSpaceRoleTests = (): void => {
  describe('Testing Post /User-Space-Role', () => {
    afterEach(async () => {
      await prisma.user_Space_Role.deleteMany();
    });
    afterAll(async () => {
      await prisma.$disconnect();
      server.close();
    });

    it('Should post a space to the database, return a 201 status and the new entry', async () => {
      const MOCK_USER = await addMockUser();
      const MOCK_SPACE = await addMockSpace();
      const postSpace: any = await request(app)
        .post('/User_Space_Roles')
        .send({
          userId: MOCK_USER.id,
          spaceId: MOCK_SPACE.id,
          roleId: 2
        });

      const getResponse: any = await prisma.user_Space_Role.findFirst({
        where: {
          user_id: MOCK_USER.id
        }
      });

      expect(getResponse.space_id).toEqual(MOCK_SPACE.id); // Check to make sure the database saved the right data
      expect(postSpace.status).toEqual(201); // Check to make sure the status code is correct
      expect(typeof postSpace.body.id).toEqual('number');// Check to make sure a number id was added
      expect(postSpace.body.userId).toEqual(MOCK_USER.id);// Check to make sure the right data is return to frontend after post
    });

    //   it('Should handle failed post a Space to the database, return 500 status, and send an error message', async () => {
    //     const postSpace: any = await request(app)
    //       .post('/spaces')
    //       .send({});

    //     const getResponse: any = await prisma.user_Space_Role.findFirst({
    //       where: {
    //         name: MOCK_USER_SPACE_ROLE_INCOMING.name
    //       }
    //     });
    //     expect(getResponse).toEqual(null); // Check to make sure the database saved the right data
    //     expect(postSpace.status).toEqual(500); // Check to make sure the status code is correct
    //     expect(postSpace.body).toEqual({ error: 'A database error has occurred.' });// Check to make sure the right error message is returned
    //   });
    // });

    // describe('Testing Delete /Spaces', () => {
    //   let MOCK_ID: number;
    //   beforeEach(async () => {
    //     await prisma.user_Space_Role.create(
    //       { data: MOCK_USER_SPACE_ROLE_INCOMING }
    //     );
    //     const newEntry:any = await prisma.user_Space_Role.findFirst({
    //       where: {
    //         name: MOCK_USER_SPACE_ROLE_INCOMING.name
    //       }
    //     });
    //     MOCK_ID = newEntry.id;
    //   });
    //   afterEach(async () => {
    //     await prisma.user_Space_Role.deleteMany();
    //   });
    //   afterAll(async () => {
    //     await prisma.$disconnect();
    //     server.close();
    //   });

    //   it('Should delete a space in the database, return a 202 status and deleted entry id entry', async () => {
    //     const postSpace: any = await request(app)
    //       .delete(`/spaces/${MOCK_ID}`);

    //     const getResponse: any = await prisma.user_Space_Role.findFirst({
    //       where: {
    //         id: MOCK_ID
    //       }
    //     });

    //     expect(getResponse).toEqual(null); // Check to make sure the database no longer holds the given entry
    //     expect(postSpace.status).toEqual(202); // Check to make sure the status code is correct
    //     expect(postSpace.body.id).toEqual(MOCK_ID);// Check to make sure the right data is return to frontend after post
    //   });

    //   it('Should handle failed delete space requests, return a 500 status and send an error message', async () => {
    //     const postSpace: any = await request(app)
    //       .delete('/spaces/WRONG_ID');

    //     const getResponse: any = await prisma.user_Space_Role.findFirst({
    //       where: {
    //         id: MOCK_ID
    //       }
    //     });

    //     expect(getResponse.name).toEqual(MOCK_USER_SPACE_ROLE_INCOMING.name); // Check to make sure the database no longer holds the given entry
    //     expect(postSpace.status).toEqual(500); // Check to make sure the status code is correct
    //     expect(postSpace.body).toEqual({ error: 'A database error has occurred.' });// Check to make sure the right data is return to frontend after post
    //   });
  });
};
