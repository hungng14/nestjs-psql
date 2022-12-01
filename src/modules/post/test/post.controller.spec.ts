import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PostStatus } from '../const/post-status';
import { PostController } from '../post.controller';
import { PostService } from '../post.service';
import { postMock } from '../__mocks__/posts.mock';
import * as request from 'supertest';

jest.mock('../post.service');

describe('PostController', () => {
  let app: INestApplication;
  let postController: PostController;
  let postService: PostService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [PostController],
      providers: [PostService],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    postController = moduleRef.get<PostController>(PostController);
    postService = moduleRef.get<PostService>(PostService);
    jest.clearAllMocks();
  });

  it('/GET post', async () => {
    return request(app.getHttpServer()).get('/post').expect(200);
  });

  describe('Get Posts', () => {
    describe('When get Post is called', () => {
      let posts: any[];
      beforeEach(async () => {
        posts = await postController.getPosts();
      });

      test('then it should return posts', () => {
        expect(posts).toEqual([postMock]);
      });
    });
  });

  describe('Get Post Detail', () => {
    describe('When get Post is called', () => {
      let post: any;
      beforeEach(async () => {
        post = await postController.getPostById(postMock.id);
      });

      test('then is should call postService', () => {
        expect(postService.getPostById).toBeCalledWith(postMock.id);
      });

      test('then it should return a post', () => {
        expect(post).toEqual(postMock);
      });
    });
  });

  describe('Create a New Post', () => {
    describe('When Post created', () => {
      let newPostCreated: any;
      const dataPost = {
        userId: postMock.userId,
        title: 'This is title',
        content: 'This is content',
        description: 'This is description',
      };

      beforeEach(async () => {
        newPostCreated = await postController.createPost(dataPost);
      });

      test('then is should call createPost postService', () => {
        expect(postService.createPost).toBeCalledWith(dataPost);
      });

      test('then is should return new post', () => {
        expect({
          ...dataPost,
          id: postMock.id,
          status: PostStatus.pending,
          userId: postMock.userId,
        }).toEqual(newPostCreated);
      });
    });
  });
});
