import app from '../app'; 
import request from 'supertest';
import { describe, expect, it, beforeEach, afterEach} from '@jest/globals'

let server!: any; 


beforeEach(async() => {
  server = await app.listen(3001)
});

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
          console.log(output.body)
          expect(output.statusCode).toEqual(200);
        })
    })
})

describe('GET/', () => {
    describe('when the user login in GET/users/:sub', () => {
        it('Get User Request', async () => {
          const output = await request(app).get('/users');
          expect(output.statusCode).toEqual(200);
        })
    })
})

describe('GET/', () => {
    describe('when the user login in GET/users/:sub', () => {
        it('Get User Request', async () => {
          const output = await request(app).get('/users');
          expect(output.statusCode).toEqual(200);
        })
    })
})
