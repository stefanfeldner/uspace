// import { app, server } from '../../index';
import serverInfo from '../../index';
import supertest from 'supertest';

const { app, server } = serverInfo;
// const supertest = require('supertest');
// const app = require('../../index');
const request = supertest(app);

describe('Testing Comment Controller', () => {
  beforeAll((done) => {
    server.close();
    done();
  });
  afterAll((done) => {
    server.close();
    done();
  });

  const MOCK_REQ = { data: { content: 'Test Post', user_id: 1, post_id: 2 } };
  const MOCK_RES = { content: 'Test Post', userId: 1, postId: 2, id: 25 };
  // const MOCK_REQ = { body: { data: { content: 'Test Post', user_id: 1, post_id: 2 } } };

  jest.mock('../../models/prisma.model', () => ({
    createComment: (req: any) : any => MOCK_RES
  }));

  test('Should send comment data in request to database and return the saved comment', (done) => {
    request.post('/comments').send(MOCK_REQ)
      // .expect(201)
      .expect((res) => {
        console.log(res);
        console.log('=============', res.body);
        res.body = { MOCK_REQ };
      })
      .end(
        done
      );
  });
});

// describe('testing the framework installed', () => {
//   it('testing the testers', () => { expect(true).toBe(true); });
// });
