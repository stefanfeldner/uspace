import { IIncomingPost } from '../../../interfaces/post.interface';
import { createPost, deleteSinglePost } from '../../../models/post.model';

const MOCK_DETAILS = { title: 'Test Post', user_id: 1, space_id: 1, tags: 'test tags', content: 'test content' };
const MOCK_RESPONSE = { ...MOCK_DETAILS, id: 1 }; ;

jest.mock('../../../queries/post.queries', () => ({
  createPostQuery: (postDetails: IIncomingPost) : any => {
    if (postDetails === MOCK_DETAILS) { return MOCK_RESPONSE; } else {
      throw new Error('A database error has occurred.');
    }
  }
}));

describe('Testing Post Model', () => {
  test('Should send post details to the db and get a post with an id back', async () => {
    const response = await createPost(MOCK_DETAILS);
    expect(response.id).toEqual(MOCK_RESPONSE.id);
  });

  test('Should throw an error if called with wrong input', async () => {
    try {
      expect(await createPost({} as IIncomingPost)).toThrowError();
    } catch (e) {
      expect((e as Error).message).toEqual('A database error has occurred.');
    }
  });
});
