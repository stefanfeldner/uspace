import { IIncomingUser } from '../../../interfaces/user.interface';
import { createUser } from '../../../models/user.model';

const TEST_ID = '1';
const MOCK_DETAILS = { email: 'test@test.com', email_verified: true, username: 'Stefan', picture_url: './image.png', sub: 'sub text' };
const MOCK_RESPONSE = { ...MOCK_DETAILS, id: +TEST_ID };

jest.mock('../../../queries/user.queries', () => ({
  createUserQuery: (newUserDetails: IIncomingUser) : any => {
    if (newUserDetails === MOCK_DETAILS) { return MOCK_RESPONSE; } else {
      throw new Error();
    }
  }

}));

describe('Testing User Model', () => {
  it('Should send user details to db and get a user with an id back', async () => {
    const response = await createUser(MOCK_DETAILS);
    expect(response.id).toEqual(MOCK_RESPONSE.id);
  });
});
