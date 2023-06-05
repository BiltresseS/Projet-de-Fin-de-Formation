import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:51193' // Remplace avec ton domaine autorisé
  });
  await app.listen(5000);
}
bootstrap();
