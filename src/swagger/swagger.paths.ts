const uuid = '01965a2b-3c4d-7e8f-9a0b-1c2d3e4f5a6b';
const catId = '01965a2b-0000-7000-8000-000000000001';
const tableId = '01965a2b-0000-7000-8000-000000000100';
const orderId = '01965a2b-0000-7000-8000-000000000200';
const ts = '2026-04-08T10:00:00.000Z';

const productExample = {
  id: uuid, name: 'Classic Burger', price: 25.50,
  description: 'Beef patty, cheese, lettuce, tomato',
  ingredients: 'beef, cheese, lettuce, tomato, brioche bun',
  imageUrl: 'https://example.com/images/burger.jpg', available: true,
  category: { id: catId, name: 'Main Courses', createdAt: ts, updatedAt: ts },
  createdAt: ts, updatedAt: ts,
};

const categoryExample = { id: catId, name: 'Beverages', createdAt: ts, updatedAt: ts };
const tableExample = { id: tableId, number: 1, createdAt: ts, updatedAt: ts };

const meta = (total: number, pages: number) => ({
  totalItems: total, totalPages: pages, currentPage: 1,
  itemsPerPage: 10, hasNextPage: pages > 1, hasPreviousPage: false,
});

const draftExample = {
  items: [{ productId: uuid, name: 'Classic Burger', price: 25.50, imageUrl: 'https://example.com/images/burger.jpg', quantity: 2 }],
  totalPrice: 51.00,
};

const pathParam = (name: string, desc: string) => ({ name, in: 'path' as const, required: true, description: desc, schema: { type: 'string', format: 'uuid' } });
const pageParams = [
  { name: 'page', in: 'query' as const, required: false, schema: { type: 'integer', default: 1 }, description: 'Page number' },
  { name: 'limit', in: 'query' as const, required: false, schema: { type: 'integer', default: 10 }, description: 'Items per page' },
];

const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` });
const err = (code: number, msg: string) => ({
  description: msg,
  content: { 'application/json': { schema: ref('ErrorResponse'), example: { statusCode: code, message: msg, error: code === 404 ? 'Not Found' : 'Bad Request' } } },
});

export const customPathDocs = {
  '/api/v1/menu': {
    get: {
      tags: ['Menu'],
      summary: 'List public menu items',
      description: 'Paginated list of products with embedded category. Ordered by category.',
      parameters: pageParams,
      responses: {
        '200': { description: 'Menu items retrieved.', content: { 'application/json': { example: { data: [productExample], meta: meta(45, 5) } } } },
      },
    },
  },

  '/api/v1/menu/{id}': {
    get: {
      tags: ['Menu'],
      summary: 'Get menu item details',
      description: 'Single product with embedded category. Returns null if not found.',
      parameters: [pathParam('id', 'Product UUID')],
      responses: {
        '200': { description: 'Menu item retrieved.', content: { 'application/json': { example: productExample } } },
        '404': err(404, 'Product not found'),
      },
    },
  },

  '/api/v1/product': {
    post: {
      tags: ['Products'],
      summary: 'Create a new product',
      description: 'Adds a product to the catalog. CategoryId must reference an existing category.',
      requestBody: {
        required: true,
        content: { 'application/json': { schema: ref('Product'), example: { name: 'Classic Burger', price: 25.50, description: 'Beef patty, cheese, lettuce, tomato', ingredients: 'beef, cheese, lettuce, tomato, brioche bun', imageUrl: 'https://example.com/images/burger.jpg', categoryId: catId } } },
      },
      responses: {
        '201': { description: 'Product created.', content: { 'application/json': { example: { ...productExample, categoryId: catId, category: undefined } } } },
        '400': err(400, 'Invalid input or category not found'),
      },
    },
    get: {
      tags: ['Products'],
      summary: 'List all products',
      description: 'Paginated list of products with embedded category, ordered by categoryId.',
      parameters: pageParams,
      responses: {
        '200': { description: 'Products retrieved.', content: { 'application/json': { example: { data: [productExample], meta: meta(100, 10) } } } },
      },
    },
  },

  '/api/v1/product/{id}': {
    get: {
      tags: ['Products'],
      summary: 'Get product by ID',
      description: 'Full product data with embedded category.',
      parameters: [pathParam('id', 'Product UUID')],
      responses: {
        '200': { description: 'Product retrieved.', content: { 'application/json': { example: productExample } } },
        '404': err(404, 'Product not found'),
      },
    },
    patch: {
      tags: ['Products'],
      summary: 'Update a product',
      description: 'Partial update (PartialType). Returns updated product with category.',
      parameters: [pathParam('id', 'Product UUID')],
      requestBody: { required: true, content: { 'application/json': { example: { price: 30.00, description: 'Premium beef patty with aged cheddar' } } } },
      responses: {
        '200': { description: 'Product updated.', content: { 'application/json': { example: { ...productExample, price: 30.00, updatedAt: '2026-04-08T10:30:00.000Z' } } } },
        '400': err(400, 'Invalid input or category not found'),
        '404': err(404, 'Product not found'),
      },
    },
    delete: {
      tags: ['Products'],
      summary: 'Delete a product',
      description: 'Permanently removes a product. May fail if linked to order items.',
      parameters: [pathParam('id', 'Product UUID')],
      responses: {
        '200': { description: 'Product deleted. Returns deleted record.' },
        '404': err(404, 'Product not found'),
      },
    },
  },

  '/api/v1/category': {
    post: {
      tags: ['Categories'],
      summary: 'Create a new category',
      description: 'Creates a category. Name is required and must be non-empty.',
      requestBody: { required: true, content: { 'application/json': { example: { name: 'Beverages' } } } },
      responses: {
        '201': { description: 'Category created.', content: { 'application/json': { example: categoryExample } } },
        '400': err(400, 'Invalid input'),
      },
    },
    get: {
      tags: ['Categories'],
      summary: 'List all categories',
      description: 'Paginated list of categories.',
      parameters: pageParams,
      responses: {
        '200': { description: 'Categories retrieved.', content: { 'application/json': { example: { data: [categoryExample], meta: meta(5, 1) } } } },
      },
    },
  },

  '/api/v1/category/{id}': {
    get: {
      tags: ['Categories'],
      summary: 'Get category by ID',
      parameters: [pathParam('id', 'Category UUID')],
      responses: {
        '200': { description: 'Category retrieved.', content: { 'application/json': { example: categoryExample } } },
        '404': err(404, 'Category not found'),
      },
    },
    patch: {
      tags: ['Categories'],
      summary: 'Update a category',
      description: 'Partial update. Returns the updated category.',
      parameters: [pathParam('id', 'Category UUID')],
      requestBody: { required: true, content: { 'application/json': { example: { name: 'Cold Beverages' } } } },
      responses: {
        '200': { description: 'Category updated.', content: { 'application/json': { example: { ...categoryExample, name: 'Cold Beverages', updatedAt: '2026-04-08T10:30:00.000Z' } } } },
        '404': err(404, 'Category not found'),
      },
    },
    delete: {
      tags: ['Categories'],
      summary: 'Delete a category',
      description: 'Permanently removes a category. May fail if products are linked.',
      parameters: [pathParam('id', 'Category UUID')],
      responses: {
        '200': { description: 'Category deleted. Returns deleted record.', content: { 'application/json': { example: categoryExample } } },
        '404': err(404, 'Category not found'),
      },
    },
  },

  '/api/v1/table': {
    post: {
      tags: ['Tables'],
      summary: 'Register a new table',
      description: 'Creates a table with auto-assigned number. No request body needed.',
      responses: {
        '201': { description: 'Table created.', content: { 'application/json': { example: tableExample } } },
      },
    },
  },

  '/api/v1/table/{id}': {
    get: {
      tags: ['Tables'],
      summary: 'Get table by ID',
      parameters: [pathParam('id', 'Table UUID')],
      responses: {
        '200': { description: 'Table retrieved.', content: { 'application/json': { example: tableExample } } },
        '404': err(404, 'Table not found'),
      },
    },
    patch: {
      tags: ['Tables'],
      summary: 'Update table number',
      description: 'Updates the table number. Must be a positive integer.',
      parameters: [pathParam('id', 'Table UUID')],
      requestBody: { required: true, content: { 'application/json': { example: { number: 5 } } } },
      responses: {
        '200': { description: 'Table updated.', content: { 'application/json': { example: { ...tableExample, number: 5, updatedAt: '2026-04-08T10:30:00.000Z' } } } },
        '400': err(400, 'Number must be a positive integer'),
        '404': err(404, 'Table not found'),
      },
    },
  },

  '/api/v1/order': {
    get: {
      tags: ['Orders'],
      summary: 'List all finalized orders',
      description: 'Paginated orders sorted by newest first. Includes items with embedded product data.',
      parameters: pageParams,
      responses: {
        '200': {
          description: 'Orders retrieved.',
          content: {
            'application/json': {
              example: {
                data: [{
                  id: orderId, tableId, totalPrice: 76.50,
                  orderItems: [{ id: '01965a2b-0000-7000-8000-000000000300', orderId, productId: uuid, quantity: 3, product: { id: uuid, name: 'Classic Burger', price: 25.50, imageUrl: 'https://example.com/images/burger.jpg' }, createdAt: ts, updatedAt: ts }],
                  createdAt: ts, updatedAt: ts,
                }],
                meta: meta(50, 5),
              },
            },
          },
        },
      },
    },
  },

  '/api/v1/order/table/{tableId}/draft': {
    post: {
      tags: ['Orders'],
      summary: 'Add item to draft order',
      description: 'Adds a product to the Redis-cached draft (TTL 15 min). Increments quantity if product already in draft.',
      parameters: [pathParam('tableId', 'Table UUID')],
      requestBody: { required: true, content: { 'application/json': { example: { productId: uuid, quantity: 2 } } } },
      responses: {
        '201': { description: 'Item added. Returns full draft.', content: { 'application/json': { schema: ref('DraftResponse'), example: draftExample } } },
        '404': err(404, 'Table or product not found'),
      },
    },
    get: {
      tags: ['Orders'],
      summary: 'View current table draft',
      description: 'Returns the current draft from Redis. Empty items array if no draft exists.',
      parameters: [pathParam('tableId', 'Table UUID')],
      responses: {
        '200': { description: 'Draft retrieved.', content: { 'application/json': { schema: ref('DraftResponse'), example: draftExample } } },
        '404': err(404, 'Table not found'),
      },
    },
  },

  '/api/v1/order/table/{tableId}/finalize': {
    post: {
      tags: ['Orders'],
      summary: 'Finalize table order',
      description: 'Persists draft to database, creates Order + OrderItems, clears Redis cache. Draft must have items.',
      parameters: [pathParam('tableId', 'Table UUID')],
      responses: {
        '201': {
          description: 'Order finalized.',
          content: { 'application/json': { schema: ref('Order'), example: { id: orderId, tableId, totalPrice: 51.00, orderItems: [{ id: '01965a2b-0000-7000-8000-000000000300', orderId, productId: uuid, quantity: 2, createdAt: ts, updatedAt: ts }], createdAt: ts, updatedAt: ts } } },
        },
        '400': err(400, 'Order is empty or session has expired.'),
        '404': err(404, 'Table not found'),
      },
    },
  },

  '/api/v1/order/table/{tableId}/draft/{productId}': {
    patch: {
      tags: ['Orders'],
      summary: 'Update draft item quantity',
      description: 'Changes quantity of a product in draft. Must be > 0; use DELETE to remove.',
      parameters: [pathParam('tableId', 'Table UUID'), pathParam('productId', 'Product UUID')],
      requestBody: { required: true, content: { 'application/json': { example: { quantity: 5 } } } },
      responses: {
        '200': { description: 'Quantity updated. Returns full draft.', content: { 'application/json': { schema: ref('DraftResponse'), example: { ...draftExample, items: [{ ...draftExample.items[0], quantity: 5 }], totalPrice: 127.50 } } } },
        '400': err(400, 'Quantity must be greater than zero.'),
        '404': err(404, 'Table or item not found in draft'),
      },
    },
    delete: {
      tags: ['Orders'],
      summary: 'Remove item from draft',
      description: 'Removes a product from draft. Deletes the cache key if it was the last item.',
      parameters: [pathParam('tableId', 'Table UUID'), pathParam('productId', 'Product UUID')],
      responses: {
        '200': { description: 'Item removed. Returns updated draft.', content: { 'application/json': { schema: ref('DraftResponse'), example: { items: [], totalPrice: 0 } } } },
        '404': err(404, 'Table or item not found in draft'),
      },
    },
  },

  '/api/v1/health': {
    get: {
      tags: ['Health'],
      summary: 'API health check',
      description: 'Verifies API and PostgreSQL connectivity via Prisma ping.',
      responses: {
        '200': {
          description: 'Healthy.',
          content: { 'application/json': { example: { status: 'ok', info: { database: { status: 'up' } }, error: {}, details: { database: { status: 'up' } } } } },
        },
        '503': {
          description: 'Database unreachable.',
          content: { 'application/json': { example: { status: 'error', info: {}, error: { database: { status: 'down', message: 'Connection failed' } }, details: { database: { status: 'down', message: 'Connection failed' } } } } },
        },
      },
    },
  },
};