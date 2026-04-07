export const customPathDocs = {
  // ==========================================
  // MENU (Public Access)
  // ==========================================
  '/api/v1/menu': {
    get: {
      summary: 'List public menu items',
      description: 'Retrieves a paginated list of all available menu items for customer viewing.',
      parameters: [
        { name: 'page', in: 'query', description: 'Page number for pagination', example: 1, required: false },
        { name: 'limit', in: 'query', description: 'Number of items per page', example: 10, required: false }
      ],
      responses: {
        '200': { 
          description: 'Menu items retrieved successfully.',
          content: {
            'application/json': {
              example: {
                data: [
                  {
                    id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
                    name: 'Classic Burger',
                    price: 25.50,
                    description: 'Beef patty, cheese, lettuce, tomato',
                    imageUrl: 'https://example.com/images/burger.jpg',
                    categoryId: 'c190f1ee-6c54-4b01-90e6-d701748f0852',
                    isAvailable: true
                  }
                ],
                meta: { page: 1, limit: 10, total: 45, totalPages: 5 }
              }
            }
          }
        }
      }
    },
  },
  '/api/v1/menu/{id}': {
    get: {
      summary: 'Get menu item details',
      description: 'Retrieves detailed information about a specific public menu item.',
      parameters: [{ name: 'id', in: 'path', required: true, example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' }],
      responses: {
        '200': { 
          description: 'Item details retrieved successfully.',
          content: {
            'application/json': {
              example: {
                id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
                name: 'Classic Burger',
                price: 25.50,
                description: 'Beef patty, cheese, lettuce, tomato',
                imageUrl: 'https://example.com/images/burger.jpg',
                categoryId: 'c190f1ee-6c54-4b01-90e6-d701748f0852',
                isAvailable: true,
                createdAt: '2026-03-05T20:42:39.000Z',
                updatedAt: '2026-03-05T20:42:39.000Z'
              }
            }
          }
        },
        '404': { description: 'Menu item not found.' }
      }
    },
  },

  // ==========================================
  // PRODUCT (Catalog Management)
  // ==========================================
  '/api/v1/product': {
    post: {
      summary: 'Create a new product',
      description: 'Adds a new product to the restaurant catalog. Requires administrative privileges.',
      requestBody: {
        content: {
          'application/json': {
            example: { name: 'Classic Burger', price: 25.50, description: 'Beef patty...', categoryId: 'cat-uuid-123', imageUrl: 'url' }
          }
        }
      },
      responses: {
        '201': { 
          description: 'Product successfully created.',
          content: {
            'application/json': {
              example: {
                id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
                name: 'Classic Burger',
                price: 25.50,
                description: 'Beef patty...',
                categoryId: 'cat-uuid-123',
                imageUrl: 'url',
                isAvailable: true,
                createdAt: '2026-04-07T10:00:00.000Z'
              }
            }
          }
        },
      }
    },
    get: {
      summary: 'List all products',
      description: 'Retrieves a paginated list of all products in the internal catalog.',
      parameters: [
        { name: 'page', in: 'query', example: 1 },
        { name: 'limit', in: 'query', example: 10 }
      ],
      responses: {
        '200': { 
          description: 'Products retrieved successfully.',
          content: {
            'application/json': {
              example: {
                data: [{ id: 'uuid', name: 'Product 1', price: 10.0 }],
                meta: { page: 1, limit: 10, total: 100 }
              }
            }
          }
        }
      }
    },
  },
  '/api/v1/product/{id}': {
    get: {
      summary: 'Get product by ID',
      description: 'Retrieves the complete data of a specific product from the catalog.',
      parameters: [{ name: 'id', in: 'path', required: true }],
      responses: {
        '200': { 
          description: 'Product data retrieved successfully.',
          content: { 'application/json': { example: { id: 'uuid', name: 'Product 1', price: 10.0, isAvailable: true } } }
        },
      }
    },
    patch: {
      summary: 'Update product',
      description: 'Partially updates an existing product\'s details.',
      requestBody: {
        content: { 'application/json': { example: { price: 28.00, isAvailable: false } } }
      },
      responses: {
        '200': { 
          description: 'Product updated successfully.',
          content: { 'application/json': { example: { id: 'uuid', name: 'Product 1', price: 28.00, isAvailable: false } } }
        },
      }
    },
    delete: {
      summary: 'Delete product',
      description: 'Permanently removes a product from the catalog.',
      parameters: [{ name: 'id', in: 'path', required: true }],
      responses: {
        '200': { 
          description: 'Product successfully deleted.',
          content: { 'application/json': { example: { message: 'Product successfully deleted' } } }
        },
      }
    },
  },

  // ==========================================
  // CATEGORY (Category Management)
  // ==========================================
  '/api/v1/category': {
    post: {
      summary: 'Create a new category',
      description: 'Creates a new category to group products.',
      requestBody: {
        content: { 'application/json': { example: { name: 'Beverages', description: 'Soft drinks and juices' } } }
      },
      responses: { 
        '201': { 
          description: 'Category created successfully.',
          content: { 'application/json': { example: { id: 'cat-uuid-123', name: 'Beverages', description: 'Soft drinks and juices', createdAt: '2026-04-07T10:00:00.000Z' } } }
        } 
      }
    },
    get: {
      summary: 'List all categories',
      description: 'Retrieves a paginated list of product categories.',
      responses: { 
        '200': { 
          description: 'Categories retrieved successfully.',
          content: { 'application/json': { example: { data: [{ id: 'cat-uuid-123', name: 'Beverages' }], meta: { total: 5 } } } }
        } 
      }
    },
  },
  '/api/v1/category/{id}': {
    get: {
      summary: 'Get category by ID',
      parameters: [{ name: 'id', in: 'path', required: true }],
      responses: { 
        '200': { 
          description: 'Category retrieved successfully.',
          content: { 'application/json': { example: { id: 'cat-uuid-123', name: 'Beverages', description: 'Soft drinks' } } }
        } 
      }
    },
    patch: {
      summary: 'Update category',
      parameters: [{ name: 'id', in: 'path', required: true }],
      requestBody: { content: { 'application/json': { example: { name: 'Cold Beverages' } } } },
      responses: { 
        '200': { 
          description: 'Category updated successfully.',
          content: { 'application/json': { example: { id: 'cat-uuid-123', name: 'Cold Beverages' } } }
        } 
      }
    },
    delete: {
      summary: 'Delete category',
      parameters: [{ name: 'id', in: 'path', required: true }],
      responses: { 
        '200': { description: 'Category deleted successfully.', content: { 'application/json': { example: { message: 'Category deleted' } } } } 
      }
    },
  },

  // ==========================================
  // TABLE (Physical Table Management)
  // ==========================================
  '/api/v1/table': {
    post: {
      summary: 'Register a new table',
      description: 'Adds a new physical dining table to the restaurant floor plan.',
      requestBody: {
        content: { 'application/json': { example: { number: 12, capacity: 4 } } }
      },
      responses: { 
        '201': { 
          description: 'Table registered successfully.',
          content: { 'application/json': { example: { id: 'table-uuid-12', number: 12, capacity: 4, isAvailable: true } } }
        } 
      }
    },
  },
  '/api/v1/table/{id}': {
    get: {
      summary: 'Get table status',
      parameters: [{ name: 'id', in: 'path', required: true }],
      responses: { 
        '200': { 
          description: 'Table details retrieved successfully.',
          content: { 'application/json': { example: { id: 'table-uuid-12', number: 12, capacity: 4, isAvailable: false } } }
        } 
      }
    },
    patch: {
      summary: 'Update table details',
      parameters: [{ name: 'id', in: 'path', required: true }],
      requestBody: { content: { 'application/json': { example: { isAvailable: true } } } },
      responses: { 
        '200': { 
          description: 'Table updated successfully.',
          content: { 'application/json': { example: { id: 'table-uuid-12', number: 12, capacity: 4, isAvailable: true } } }
        } 
      }
    },
  },

  // ==========================================
  // ORDER (Drafting & Finalization)
  // ==========================================
  '/api/v1/order': {
    get: {
      summary: 'List all orders',
      description: 'Retrieves a paginated history of all orders placed in the restaurant.',
      responses: { 
        '200': { 
          description: 'Orders retrieved successfully.',
          content: { 'application/json': { example: { data: [{ id: 'order-123', tableId: 'table-12', status: 'COMPLETED', totalPrice: 150.50 }], meta: { page: 1 } } } }
        } 
      }
    },
  },
  '/api/v1/order/table/{tableId}/draft': {
    post: {
      summary: 'Add item to draft',
      description: 'Adds a product to the current unfinalized order (draft) for a specific table. Starts a new order if none exists.',
      parameters: [{ name: 'tableId', in: 'path', required: true }],
      requestBody: {
        content: { 'application/json': { example: { productId: 'prod-uuid-123', quantity: 2, notes: 'No onions' } } }
      },
      responses: { 
        '201': { 
          description: 'Item added to draft successfully.',
          content: { 'application/json': { example: { id: 'item-uuid-1', orderId: 'draft-order-uuid', productId: 'prod-uuid-123', quantity: 2, notes: 'No onions', price: 25.50 } } }
        } 
      }
    },
    get: {
      summary: 'View current table draft',
      parameters: [{ name: 'tableId', in: 'path', required: true }],
      responses: { 
        '200': { 
          description: 'Draft retrieved successfully.',
          content: { 
            'application/json': { 
              example: { 
                id: 'draft-order-uuid', 
                tableId: 'table-uuid-12', 
                status: 'DRAFT', 
                totalPrice: 51.00,
                items: [
                  { id: 'item-uuid-1', productId: 'prod-uuid-123', quantity: 2, price: 25.50, notes: 'No onions' }
                ] 
              } 
            } 
          }
        } 
      }
    },
  },
  '/api/v1/order/table/{tableId}/finalize': {
    post: {
      summary: 'Finalize table order',
      description: 'Confirms the draft and officially places the order for preparation and billing.',
      parameters: [{ name: 'tableId', in: 'path', required: true }],
      responses: { 
        '201': { 
          description: 'Order finalized successfully.',
          content: { 
            'application/json': { 
              example: { id: 'order-uuid-final', tableId: 'table-uuid-12', status: 'PENDING_KITCHEN', totalPrice: 51.00, finalizedAt: '2026-04-07T10:15:00.000Z' }
            } 
          }
        }
      }
    },
  },
  '/api/v1/order/table/{tableId}/draft/{productId}': {
    patch: {
      summary: 'Update draft item quantity',
      parameters: [
        { name: 'tableId', in: 'path', required: true },
        { name: 'productId', in: 'path', required: true }
      ],
      requestBody: {
        content: { 'application/json': { example: { quantity: 3 } } }
      },
      responses: { 
        '200': { 
          description: 'Item quantity updated successfully.',
          content: { 'application/json': { example: { id: 'item-uuid-1', productId: 'prod-uuid-123', quantity: 3, price: 25.50 } } }
        } 
      }
    },
    delete: {
      summary: 'Remove item from draft',
      parameters: [
        { name: 'tableId', in: 'path', required: true },
        { name: 'productId', in: 'path', required: true }
      ],
      responses: { 
        '200': { description: 'Item removed from draft.', content: { 'application/json': { example: { message: 'Item successfully removed' } } } } 
      }
    },
  },

  // ==========================================
  // HEALTH
  // ==========================================
  '/api/v1/health': {
    get: {
      summary: 'API Health Check',
      description: 'Checks the availability of the API and the status of the database connection via Prisma.',
      responses: {
        '200': { 
          description: 'Service is healthy and database is connected.',
          content: {
            'application/json': {
              example: {
                status: 'ok',
                info: { database: { status: 'up' } },
                error: {},
                details: { database: { status: 'up' } }
              }
            }
          }
        }
      }
    },
  },
};