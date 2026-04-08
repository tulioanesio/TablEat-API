import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ConfigService } from '@nestjs/config';
import { customPathDocs } from './swagger.paths';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
): void {
  const port = configService.get<number>('PORT') ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('TablEat API')
    .setDescription(
      'RESTful API for restaurant management — digital menu, product catalog, table registration, and a Redis-cached draft ordering system.\n\n' +
      '**Key features:** URI versioning (`/api/v1`), pagination with navigation helpers, rate limiting (100 req/60s), class-validator DTOs, and health check via `@nestjs/terminus`.',
    )
    .setVersion('1.0.0')
    .setContact('Túlio Anésio', 'https://github.com/tulioanesio', '')
    .setExternalDoc('GitHub Repository', 'https://github.com/tulioanesio/TablEat-API')
    .addTag('Menu', 'Public read-only endpoints for customer-facing apps.')
    .addTag('Products', 'Internal CRUD for restaurant catalog items.')
    .addTag('Categories', 'Product grouping (e.g., Appetizers, Beverages).')
    .addTag('Tables', 'Physical table registration and lookup.')
    .addTag('Orders', 'Draft → finalize order flow with Redis cache (TTL 15 min).')
    .addTag('Health', 'Liveness probe with database connectivity check.')
    .addServer(`http://localhost:${port}`, 'Local Development')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  document.components = {
    ...document.components,
    schemas: {
      ...document.components?.schemas,
      Product: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          price: { type: 'number', format: 'decimal' },
          description: { type: 'string', nullable: true },
          ingredients: { type: 'string', nullable: true },
          imageUrl: { type: 'string', format: 'uri', nullable: true },
          available: { type: 'boolean' },
          category: { $ref: '#/components/schemas/Category' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Table: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          number: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          tableId: { type: 'string', format: 'uuid' },
          totalPrice: { type: 'number', format: 'decimal' },
          orderItems: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      OrderItem: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          orderId: { type: 'string', format: 'uuid' },
          productId: { type: 'string', format: 'uuid' },
          quantity: { type: 'integer', minimum: 1 },
          product: {
            type: 'object',
            properties: {
              id: { type: 'string' }, name: { type: 'string' },
              price: { type: 'number' }, imageUrl: { type: 'string', nullable: true },
            },
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      DraftResponse: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                productId: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                price: { type: 'number' },
                imageUrl: { type: 'string', nullable: true },
                quantity: { type: 'integer', minimum: 1 },
              },
            },
          },
          totalPrice: { type: 'number', format: 'decimal' },
        },
      },
      PaginationMeta: {
        type: 'object',
        properties: {
          totalItems: { type: 'integer' },
          totalPages: { type: 'integer' },
          currentPage: { type: 'integer' },
          itemsPerPage: { type: 'integer' },
          hasNextPage: { type: 'boolean' },
          hasPreviousPage: { type: 'boolean' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          statusCode: { type: 'integer' },
          message: { oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }] },
          error: { type: 'string' },
        },
      },
    },
  };

  for (const [path, methods] of Object.entries(customPathDocs)) {
    if (document.paths[path]) {
      for (const [method, docs] of Object.entries(methods)) {
        if (document.paths[path][method]) {
          Object.assign(document.paths[path][method], docs);
        }
      }
    } else {
      Logger.warn(`Route ${path} not found in generated Swagger document.`);
    }
  }

  app.use(
    '/docs',
    apiReference({
      theme: 'kepler',
      content: document,
    } as any),
  );
}
