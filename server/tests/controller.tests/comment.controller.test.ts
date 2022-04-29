import app from '../../index';
import supertest from 'supertest';
// const supertest = require('supertest');
// const app = require('../../index');

const request = supertest(app);

describe('Testing Comment Controller', () => {
  // afterEach((done) => { done(); });

  const MOCK_REQ = { data: { content: 'Test Post', user_id: 1, post_id: 2 } };
  // const MOCK_REQ = { body: { data: { content: 'Test Post', user_id: 1, post_id: 2 } } };

  jest.mock('../../models/prisma.model', () => ({
    createComment: (req: any) : any => ({ data: { content: req.content, user_id: req.user_id, post_id: req.post_id } })
  }));

  test('Should send comment data in request to database and return the saved comment', (done) => {
    request.post('/comments').send({ MOCK_REQ })
      .expect(201)
      .expect((res) => { res.body = { MOCK_REQ }; })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

// describe('testing the framework installed', () => {
//   it('testing the testers', () => { expect(true).toBe(true); });
// });
