import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lMkBnbWFpbC5jb20iLCJpYXQiOjE2NDYwNjU0NDYsImV4cCI6MTY0NjA2NjY0Nn0.qmnCCkpdLZ-IMIB8BnFHQdpZbA1Nnng7b2K_Nb4qzZ0"
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set({ Accept: 'application/json' })
      .set('Authorization', token)
      .expect(200)
      .expect('Hello World!');
  });
});
