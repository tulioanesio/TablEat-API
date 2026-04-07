import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
): void {
  const config = new DocumentBuilder()
    .setTitle('TablEat API')
    .setDescription('The TablEat restaurant management system API')
    .setVersion('1.0')
    .addTag('product', 'Menu items and catalog')
    .addTag('category', 'Product categorization')
    .addTag('menu', 'Public menu access')
    .addTag('table', 'Physical table management and registration')
    .addTag('order', 'Drafting and finalizing customer orders')
    .addServer(`http://localhost:${configService.get<number>('PORT') ?? 3000}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      theme: 'default',
      content: document,
    }),
  );
}
