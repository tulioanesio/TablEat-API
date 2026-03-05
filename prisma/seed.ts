import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from 'pg'; 
import { PrismaClient } from "src/generated/prisma/client";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando o seed do banco de dados...');

  const entradas = await prisma.category.create({
    data: { name: 'Entradas & Porções' },
  });

  const pratos = await prisma.category.create({
    data: { name: 'Pratos Principais' },
  });

  const lanches = await prisma.category.create({
    data: { name: 'Burgers & Lanches' },
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
        name: 'Batata Frita Rústica',
        price: 28.90,
        description: 'Porção de batatas rústicas fritas, acompanhadas de maionese artesanal de alho e alecrim.',
        ingredients: 'Batata, alho, alecrim, maionese artesanal',
        categoryId: entradas.id,
      },
      {
        name: 'Iscas de Frango Crocantes',
        price: 34.50,
        description: 'Tiras de peito de frango empanadas na farinha panko com molho mostarda e mel.',
        ingredients: 'Peito de frango, farinha panko, mostarda, mel, especiarias',
        categoryId: entradas.id,
      },

      {
        name: 'Filé Mignon à Parmegiana',
        price: 65.00,
        description: 'Clássico parmegiana de filé mignon, gratinado com queijo muçarela. Acompanha arroz branco e fritas.',
        ingredients: 'Filé mignon, molho de tomate artesanal, queijo muçarela, arroz, batata frita',
        categoryId: pratos.id,
      },
      {
        name: 'Risoto de Funghi Secchi',
        price: 54.00,
        description: 'Risoto cremoso de cogumelos funghi com queijo parmesão ralado na hora (Opção Vegetariana).',
        ingredients: 'Arroz arbóreo, funghi secchi, manteiga, vinho branco, queijo parmesão',
        categoryId: pratos.id,
      },
      {
        name: 'Salada Caesar com Frango',
        price: 38.50,
        description: 'Mix de folhas verdes, croutons crocantes, lascas de parmesão, tiras de frango grelhado e molho Caesar.',
        ingredients: 'Alface americana, frango grelhado, parmesão, croutons, molho caesar',
        categoryId: pratos.id,
      },

      {
        name: 'Smash Burger Duplo',
        price: 36.90,
        description: 'Dois smash burgers bovinos de 90g, duplo queijo cheddar derretido, cebola caramelizada e molho especial no pão brioche.',
        ingredients: 'Pão brioche, blend de carne bovina 180g, queijo cheddar, cebola, molho da casa',
        categoryId: lanches.id,
      },
      {
        name: 'Sanduíche de Pernil',
        price: 32.00,
        description: 'Pernil suíno assado lentamente, desfiado e temperado, servido com vinagrete no pão francês crocante.',
        ingredients: 'Pão francês, pernil suíno, tomate, cebola, pimentão, azeite',
        categoryId: lanches.id,
      },

      {
        name: 'Coca-Cola Original',
        price: 7.50,
        description: 'Lata 350ml bem gelada.',
        ingredients: 'Água gaseificada, açúcar, extrato de noz de cola, cafeína',
        categoryId: bebidas.id,
      },
      {
        name: 'Suco Natural de Laranja',
        price: 12.00,
        description: 'Suco feito com laranjas frescas espremidas na hora (400ml).',
        ingredients: 'Laranja fresca, gelo',
        categoryId: bebidas.id,
      },
      {
        name: 'Chopp Pilsen Artesanal',
        price: 14.90,
        description: 'Copo de chopp artesanal 500ml estupidamente gelado.',
        ingredients: 'Água, malte de cevada, lúpulo, levedura',
        categoryId: bebidas.id,
      },

      {
        name: 'Brownie com Sorvete',
        price: 24.00,
        description: 'Brownie de chocolate meio amargo servido quente, acompanhado de uma bola de sorvete de creme.',
        ingredients: 'Chocolate, farinha, manteiga, ovos, sorvete de baunilha',
        categoryId: sobremesas.id,
      },
      {
        name: 'Pudim de Leite Condensado',
        price: 16.50,
        description: 'Clássico pudim de leite condensado liso e sem furinhos, com calda generosa de caramelo.',
        ingredients: 'Leite condensado, leite, ovos, açúcar',
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