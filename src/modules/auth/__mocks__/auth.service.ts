import { userMock } from './auth.mock';

export const AuthService = jest.fn().mockReturnValue({
  signUp: jest.fn().mockResolvedValue(userMock),
});
