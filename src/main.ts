import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TablEat API')
    .setDescription('The TablEat restaurant management system API')
    .setVersion('1.0')
    .addTag('product', 'Menu items and catalog')
    .addTag('category', 'Product categorization')
    .addTag('menu', 'Public menu access')
    .addTag('table', 'Physical table management and registration')
    .addTag('order', 'Drafting and finalizing customer orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      theme: 'default',
      content: document,
    }),
  );

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
