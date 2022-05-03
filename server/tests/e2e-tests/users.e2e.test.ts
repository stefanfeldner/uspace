import { server, app } from '../../index';
import { prisma } from '../../prisma/prisma-client';
import request from 'supertest';
import { IIncomingUser } from '../../interfaces/user.interface';

// const MOCK_CREATED_AT = Date.now();
const MOCK_POST_INCOMING: IIncomingUser = {
  email: ' test@test.com',
  emailVerified: false,
  username: 'testUsername',
  pictureUrl: '/fakeImageUrl.png',
  sub: 'subText'
};

describe('Testing Post user to the /user route', () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  it('Should post a user to the database', async () => {
    const postUser: any = await request(app)
      .post('/users')
      .send(MOCK_POST_INCOMING);

    const getResponse: any = await prisma.user.findFirst({
      where: {
        username: postUser.username
      }
    });
    console.log('getResponse', getResponse);

    expect(getResponse.email).toEqual(MOCK_POST_INCOMING.email);
  });
});
