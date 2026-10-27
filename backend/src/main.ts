import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Izinkan CORS agar frontend Vue.js dapat memanggil API tanpa kendala
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // Prefix global untuk semua rute API: /api/...
  app.setGlobalPrefix('api');

  // Validasi otomatis untuk setiap request body (DTO)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 NestJS API running on: http://localhost:${port}/api/assets`);
}
await bootstrap();
