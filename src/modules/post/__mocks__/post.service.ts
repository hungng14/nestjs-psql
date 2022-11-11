import { postMock } from './posts.mock';

export const PostService = jest.fn().mockReturnValue({
  getPostById: jest.fn().mockResolvedValue(postMock),
  getPosts: jest.fn().mockResolvedValue([postMock]),
  createPost: jest.fn().mockResolvedValue(postMock),
});
