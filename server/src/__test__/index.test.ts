import app from '../app';
import jestOpenAPI from 'jest-openapi'; 
import path from 'path';
import request from 'supertest';
import { user_data, space_data, post_data, comment_data } from './mock-data';
import { describe, expect, it, beforeEach, afterEach} from '@jest/globals';
import { Server } from 'http';

const PORT = process.env.PORT
let server: Server

jestOpenAPI(path.join(__dirname, 'openapi.test.yml'));

beforeEach(async() => {
  server = await app.listen(PORT);
});

afterEach(async () => {
  server.close();
})

describe('GET', () => {
  describe('/users/:sub', () => {
    it('should find a user by id', async () => {
      const output = await request(app).get('/users/5ebac534954b54139c806otter');
      
      // @ts-ignore
      expect(output).toSatisfyApiSpec();
    });
  });
});

describe('POST', () => {
  describe('/users', () => {
    it('should create a user', async () => {
      const output = await request(app).post('/users').send(user_data);

      // @ts-ignore
      expect(output).toSatisfyApiSpec();
    });
  });

  describe('/space', () => {
    it('should create a space', async () => {
      const output = await request(app).post('/spaces').send(space_data);

      // @ts-ignore
      expect(output).toSatisfyApiSpec();
    });
  });

  describe('/posts', () => {
    it('should create a post', async () => {
    
      const output = await request(app).post('/posts').send(post_data);
      
      // @ts-ignore
      expect(output).toSatisfyApiSpec();
    });
  });

  describe('/comments', () => {
    it('should create comment', async () => {
      

      const output = await request(app).post('/comments').send(comment_data);
      
      // @ts-ignore
      expect(output).toSatisfyApiSpec();
    });
  });
});

describe('DELETE', () => {
  describe('/space/:spacesId', () => {
      it('should delete space by id', async () => {
        const output = await request(app).delete('/spaces/13');

        // @ts-ignore
        expect(output).toSatisfyApiSpec();
      });
  });

  describe('/posts/postId', () => {
      it('should delete post by id', async () => {
        const output = await request(app).delete('/posts/1');
        
        // @ts-ignore
        expect(output).toSatisfyApiSpec();
      });
  });

  describe('/comments/commentId', () => {
    it('should delete comment by id', async () => {
      const output = await request(app).delete('/comments/1');
      
      // @ts-ignore
      expect(output).toSatisfyApiSpec();
    });
  });
})


describe('NOT FOUND', () => {
  describe('get/users/:sub', () => {
    it('should return not found', async () => {
      const output = await request(app).get('/users/2');
      
      // @ts-ignore
      expect(output).toSatisfyApiSpec();
    });
  });

  describe('delete/space/:spacesId', () => {
    it('should return not found', async () => {
      const output = await request(app).delete('/spaces/122222');

      // @ts-ignore
      expect(output).toSatisfyApiSpec();
    });
  });

  describe('delete/posts/postId', () => {
    it('should return not found', async () => {
      const output = await request(app).delete('/posts/122222');
      
      // @ts-ignore
      expect(output).toSatisfyApiSpec();
    });
  });

  describe('delete/comments/commentId', () => {
    it('should return not found', async () => {
      const output = await request(app).delete('/comments/122222');
      
      // @ts-ignore
      expect(output).toSatisfyApiSpec();
    });
  });
});


describe('BAD REQUEST', () => {
  describe('delete/space/:spacesId', () => {
    it('should return bad request if the id is passed incorrectly', async () => {
      const output = await request(app).delete('/spaces/otters');

      // @ts-ignore
      expect(output.statusCode).toEqual(400);
    });
  });

  describe('delete/posts/postId', () => {
    it('should return bad request if the id is passed incorrectly', async () => {
      const output = await request(app).delete('/posts/otters');
      
      // @ts-ignore
      expect(output.statusCode).toEqual(400);
    });
  });

  describe('delete/comments/commentId', () => {
    it('should return bad request if the id is passed incorrectly', async () => {
      const output = await request(app).delete('/comments/otters');
      
      // @ts-ignore
      expect(output.statusCode).toEqual(400);
    });
  });
});



