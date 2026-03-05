import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TablEat API')
    .setDescription('The TablEat restaurant management system API description')
    .setVersion('1.0')
    .addTag('order', 'Drafting and finalizing customer orders')
    .addTag('table', 'Physical table management and registration')
    .addTag('product', 'Menu items and catalog')
    .addTag('category', 'Product categorization')
    .addTag('menu', 'Public menu access')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
