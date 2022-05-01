import app from '../app'; 
import request from 'supertest';

let server: any; 

beforeEach(async() => {
  server = await app.listen(3005)
})

afterEach(() => {
  server.close();
})

it('simple test', ()=> {
  expect(1+1).toBe(2);
})


describe('GET/', () => {
    describe('when the user login in GET/users/:sub', () => {
        it('Get User Request', async () => {
          const output = await request(app).get('/users');
          expect(output.statusCode).toEqual(200);
        })
    })
})
