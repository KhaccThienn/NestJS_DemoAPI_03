import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    cors: true,
  });

  app.useStaticAssets('./src/public');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8888);
}
bootstrap();
