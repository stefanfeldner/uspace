import { commentsTests } from './comments.e2e';
import { postsTests } from './posts.e2e';
import { userTests } from './users.e2e';

describe('E2E Tests', () => {
  postsTests();
  userTests();
  commentsTests();
});
