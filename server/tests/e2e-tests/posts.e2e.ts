// import { prisma } from '../../prisma/prisma-client';
// import { app, server } from '../../index';

// import request from 'supertest';

// describe('Prisma Tests', () => {
//   afterEach(async () => {
//     await prisma.user.deleteMany();
//   });
//   afterAll(async () => {
//     await prisma.$disconnect();
//     server.close();
//   });
// describe('GET /users', () => {
//   it('should be empty initially', (done) => {
//     request(app)
//       .get('/users')
//       .expect(201)
//       .expect('Content-Type', /json/)
//       .then((res) => {
//         const users = res.body.users;
//         expect(users).toEqual([]);
//       })
//       .then(done);
//   });
//   it('should respond to added user', async () => {
//     await prisma.user.create({ data: { email: 'test@test.com' } });
//     request(app)
//       .get('/users')
//       .expect(201)
//       .expect('Content-Type', /json/)
//       .then((res) => {
//         const users = res.body.users;
//         expect(users.length).toEqual(1);
//       })
//       .catch((e) => console.log(e));
//   });
// });
// });
