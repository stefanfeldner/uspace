import app from '../app';
import jestOpenAPI from 'jest-openapi'; 
import path from 'path';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { describe, expect, it, beforeEach, afterEach} from '@jest/globals';

jestOpenAPI(path.join(__dirname, 'openapi.yml'));

let server!: any; 
const PORT = process.env.PORT

const prisma = new PrismaClient()

beforeEach(async() => {
  server = await app.listen(PORT);
});

afterEach(async () => {
  server.close();
})


describe('User', () => {

  describe('POST/users', () => {
    it('should satisfy OpenAPI spec', async () => {
      const data = {
        sub: "5ebac534954b54139c806cmeo",
        email: "fake@example.com",
        email_verified: true,
        username: "fake name",
        picture_url: "https://asdfasdfsadfsd"
      }

      const output = await request(app).post('/users').send(data);
      
      // @ts-ignore
      expect(output).toSatisfyApiSpec();
    })
  });

  describe('GET/users/:sub', () => {
      it('should satisfy OpenAPI spec', async () => {
        const output = await request(app).get('/users/5ebac534954b54139c806cmeo');
        
        // @ts-ignore
        expect(output).toSatisfyApiSpec();
      })
  });

  describe('Error: GET/users/:sub', () => {
      it('should return not found', async () => {
        const output = await request(app).get('/users/2');
        
        // @ts-ignore
        expect(output.statusCode).toEqual(404);
      })
  });
})


describe('Space', () => {
    describe('POST/space/:spacesId', () => {
        it('should satisfy OpenAPI spec', async () => {
          const data = {
            owner: "5ebac534954b54139806c112",
            name: "Otters are awesome",
            description: "space to celebrate otters"
          }

          const output = await request(app).post('/spaces').send(data);

          // @ts-ignore
          expect(output).toSatisfyApiSpec();
        })
    })

    describe('DELETE/space/:spacesId', () => {
        it('should satisfy OpenAPI spec', async () => {
          const output = await request(app).delete('/spaces/13');

          // @ts-ignore
          expect(output).toSatisfyApiSpec();
        })
    })
})

describe('Post', () => {
    describe('POST/posts', () => {
        it('should satisfy OpenAPI spec', async () => {
          const data = {
            space_id: 123,
            user_id: "5ebac534954b54139806c112",
            title: "Did you know...",
            content: "...that otters hold hands when they sleep?",
            tags: "otters, cute, fluffy"
          }

          const output = await request(app).post('/posts').send(data);
          
          // @ts-ignore
          expect(output).toSatisfyApiSpec();
        })
    });

    describe('DELETE/posts/postId', () => {
        it('should satisfy OpenAPI spec', async () => {
          const output = await request(app).delete('/posts/1');
          
          // @ts-ignore
          expect(output).toSatisfyApiSpec();
        })
    });

})


describe('Comment', () => {
    describe('POST/comments', () => {
        it('should satisfy OpenAPI spec', async () => {
          const data = {
            post_id: 234,
            user_id: "5ebac534954b54139806c112",
            content: "OMG thats the cutest thing s2 🦦!!"
          }

          const output = await request(app).post('/comments').send(data);
          
          // @ts-ignore
          expect(output).toSatisfyApiSpec();
        })
    });

    describe('DELETE/comments/commentId', () => {
        it('should satisfy OpenAPI spec', async () => {
          const output = await request(app).delete('/comments/1');
          
          // @ts-ignore
          expect(output).toSatisfyApiSpec();
        })
    });

})

