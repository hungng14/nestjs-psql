import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.useGlobalFilters(new AppExceptionFilter())
  app.setGlobalPrefix('api/v1/')
  await app.listen(process.env.PORT || 3000);
}
bootstrap();