import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from 'src/generated/prisma/client';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seed...');

  const appetizers = await prisma.category.create({
    data: { name: 'Appetizers & Sides' },
  });

  const mainCourses = await prisma.category.create({
    data: { name: 'Main Courses' },
  });

  const burgers = await prisma.category.create({
    data: { name: 'Burgers & Sandwiches' },
  });

  const drinks = await prisma.category.create({
    data: { name: 'Drinks' },
  });

  const desserts = await prisma.category.create({
    data: { name: 'Desserts' },
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'Rustic French Fries',
        price: 28.9,
        description:
          'Portion of crispy rustic fries served with homemade garlic and rosemary mayo.',
        ingredients: 'Potato, garlic, rosemary, homemade mayo',
        imageUrl:
          'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
        categoryId: appetizers.id,
      },
      {
        name: 'Crispy Chicken Strips',
        price: 34.5,
        description:
          'Panko-breaded chicken breast strips served with honey mustard sauce.',
        ingredients:
          'Chicken breast, panko breadcrumbs, mustard, honey, spices',
        imageUrl:
          'https://images.unsplash.com/photo-1562967914-608f82629710?w=500',
        categoryId: appetizers.id,
      },

      {
        name: 'Filet Mignon Parmigiana',
        price: 65.0,
        description:
          'Classic beef parmigiana topped with melted mozzarella. Served with white rice and fries.',
        ingredients:
          'Filet mignon, homemade tomato sauce, mozzarella cheese, rice, fries',
        imageUrl:
          'https://images.unsplash.com/photo-1632778149975-420e0e75ee6d?w=500',
        categoryId: mainCourses.id,
      },
      {
        name: 'Mushroom Risotto',
        price: 54.0,
        description:
          'Creamy Funghi Secchi risotto with fresh parmesan cheese (Vegetarian Option).',
        ingredients:
          'Arborio rice, funghi secchi, butter, white wine, parmesan cheese',
        imageUrl:
          'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500',
        categoryId: mainCourses.id,
      },
      {
        name: 'Chicken Caesar Salad',
        price: 38.5,
        description:
          'Fresh romaine lettuce, crunchy croutons, parmesan shavings, grilled chicken, and Caesar dressing.',
        ingredients:
          'Romaine lettuce, grilled chicken, parmesan, croutons, caesar dressing',
        imageUrl:
          'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500',
        categoryId: mainCourses.id,
      },

      {
        name: 'Double Smash Burger',
        price: 36.9,
        description:
          'Two 90g beef patties, double cheddar cheese, caramelized onions, and special sauce on a brioche bun.',
        ingredients:
          'Brioche bun, 180g beef blend, cheddar cheese, onion, house sauce',
        imageUrl:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        categoryId: burgers.id,
      },
      {
        name: 'Pulled Pork Sandwich',
        price: 32.0,
        description:
          'Slow-roasted pulled pork seasoned with house spices, served on crunchy French bread.',
        ingredients:
          'French bread, pulled pork, tomato, onion, bell pepper, olive oil',
        imageUrl:
          'https://images.unsplash.com/photo-1521390188846-e2a3f9745b6f?w=500',
        categoryId: burgers.id,
      },

      {
        name: 'Classic Coca-Cola',
        price: 7.5,
        description: 'Ice-cold 350ml can.',
        ingredients: 'Carbonated water, sugar, cola extract, caffeine',
        imageUrl:
          'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500',
        categoryId: drinks.id,
      },
      {
        name: 'Fresh Orange Juice',
        price: 12.0,
        description: '100% natural orange juice freshly squeezed (400ml).',
        ingredients: 'Fresh oranges, ice',
        imageUrl:
          'https://images.unsplash.com/photo-1613478223719-2ab30262b124?w=500',
        categoryId: drinks.id,
      },
      {
        name: 'Craft Pilsen Beer',
        price: 14.9,
        description: '500ml of local craft pilsen beer, served extra cold.',
        ingredients: 'Water, barley malt, hops, yeast',
        imageUrl:
          'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=500',
        categoryId: drinks.id,
      },

      {
        name: 'Brownie with Ice Cream',
        price: 24.0,
        description:
          'Warm dark chocolate brownie served with a scoop of vanilla ice cream.',
        ingredients: 'Chocolate, flour, butter, eggs, vanilla ice cream',
        imageUrl:
          'https://images.unsplash.com/photo-1624353335566-3d71057da00f?w=500',
        categoryId: desserts.id,
      },
      {
        name: 'Caramel Pudding',
        price: 16.5,
        description:
          'Smooth Brazilian-style milk flan with a rich caramel sauce.',
        ingredients: 'Condensed milk, milk, eggs, sugar',
        imageUrl:
          'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=500',
        categoryId: desserts.id,
      },
    ],
  });

  console.log(
    'Seed completed successfully! Categories and Products have been created.',
  );
}

main()
  .catch((e) => {
    console.error('Error executing seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
