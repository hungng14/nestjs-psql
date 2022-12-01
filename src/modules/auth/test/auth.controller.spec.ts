import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import * as request from 'supertest';
import { userMock } from '../__mocks__/auth.mock';

jest.mock('../auth.service');

describe('AuthController', () => {
  let app: INestApplication;
  let authController: AuthController;
  let authService: AuthService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('/POST auth sign up', async () => {
    return request(app.getHttpServer()).post('/auth/sign-up').expect(201);
  });

  describe('Sign Up New User', () => {
    describe('When get sign up is called', () => {
      let newUser: any;
      beforeEach(async () => {
        newUser = await authController.signUp(userMock);
      });

      test('then it should return new user', async () => {
        expect(authService.signUp(userMock)).resolves.toBe(newUser);
      });
    });
  });
});
