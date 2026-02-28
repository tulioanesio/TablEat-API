import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from 'pg'; 
import { PrismaClient } from "src/generated/prisma/client";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('A iniciar o seed da base de dados...');
  const lanches = await prisma.category.create({
    data: { name: 'Lanches' },
  });

  const bebidas = await prisma.category.create({
    data: { name: 'Bebidas' },
  });

  const sobremesas = await prisma.category.create({
    data: { name: 'Sobremesas' },
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'Hambúrguer Clássico',
        price: 8.5,
        description: 'Um delicioso hambúrguer com queijo e molho especial.',
        ingredients:
          'Pão brioche, carne de vaca 180g, queijo cheddar, alface, tomate, molho da casa',
        categoryId: lanches.id,
      },
      {
        name: 'Tosta Mista',
        price: 4.0,
        description: 'Tosta em pão rústico com queijo derretido e fiambre.',
        ingredients: 'Pão rústico, queijo flamengo, fiambre, manteiga',
        categoryId: lanches.id,
      },
      {
        name: 'Refrigerante Cola',
        price: 2.5,
        description: 'Lata de 330ml bem fresca.',
        ingredients: 'Água gaseificada, açúcar, extrato de cola',
        categoryId: bebidas.id,
      },
      {
        name: 'Sumo de Laranja Natural',
        price: 3.0,
        description: 'Sumo feito com laranjas frescas espremidas na hora.',
        ingredients: 'Laranja fresca, gelo',
        categoryId: bebidas.id,
      },
      {
        name: 'Bolo de Chocolate',
        price: 4.5,
        description: 'Fatia generosa de bolo de chocolate húmido.',
        ingredients: 'Farinha, ovos, cacau, açúcar, manteiga',
        categoryId: sobremesas.id,
      },
      {
        name: 'Gelado de Baunilha',
        price: 3.5,
        description: 'Duas bolas de gelado artesanal de baunilha.',
        ingredients: 'Leite, natas, açúcar, fava de baunilha',
        categoryId: sobremesas.id,
      },
    ],
  });

  console.log(
    'Seed concluído com sucesso! Categorias e Produtos foram criados.',
  );
}

main()
  .catch((e) => {
    console.error('Erro ao executar o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
