import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../src/generated/prisma/client';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting TablEat database seed...\n');

  console.log('📂 Creating categories...');

  const entradas = await prisma.category.create({
    data: { name: 'Entradas' },
  });

  const pratosPrincipais = await prisma.category.create({
    data: { name: 'Pratos Principais' },
  });

  const hamburgueres = await prisma.category.create({
    data: { name: 'Hambúrgueres' },
  });

  const massas = await prisma.category.create({
    data: { name: 'Massas' },
  });

  const saladas = await prisma.category.create({
    data: { name: 'Saladas' },
  });

  const bebidas = await prisma.category.create({
    data: { name: 'Bebidas' },
  });

  const sobremesas = await prisma.category.create({
    data: { name: 'Sobremesas' },
  });

  console.log('🍽️  Creating products...');

  await prisma.product.createMany({
    data: [
      {
        name: 'Batata Frita Rústica',
        price: 28.90,
        description: 'Porção generosa de batatas rústicas crocantes, servidas com maionese de alho caseira e alecrim.',
        ingredients: 'Batata, alho, alecrim, maionese caseira, sal grosso',
        imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
        categoryId: entradas.id,
      },
      {
        name: 'Tirinhas de Frango Crocante',
        price: 34.50,
        description: 'Tiras de peito de frango empanadas no panko, acompanhadas de molho mostarda e mel.',
        ingredients: 'Peito de frango, panko, mostarda, mel, especiarias',
        imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500',
        categoryId: entradas.id,
      },
      {
        name: 'Bolinho de Bacalhau',
        price: 32.00,
        description: '8 unidades de bolinho de bacalhau artesanal, crocantes por fora e macios por dentro.',
        ingredients: 'Bacalhau desfiado, batata, salsa, cebola, ovo',
        imageUrl: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=500',
        categoryId: entradas.id,
      },
      {
        name: 'Bruschetta Caprese',
        price: 26.00,
        description: 'Fatias de pão italiano tostado com tomate fresco, muçarela de búfala e manjericão.',
        ingredients: 'Pão italiano, tomate, muçarela de búfala, manjericão, azeite',
        imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500',
        categoryId: entradas.id,
      },
      {
        name: 'Anéis de Cebola',
        price: 24.90,
        description: 'Anéis de cebola empanados com farinha temperada, super crocantes. Acompanha molho barbecue.',
        ingredients: 'Cebola, farinha de trigo, temperos, molho barbecue',
        imageUrl: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500',
        categoryId: entradas.id,
      },

      {
        name: 'Filé Mignon à Parmegiana',
        price: 68.00,
        description: 'Clássico filé mignon empanado coberto com molho de tomate caseiro e muçarela gratinada. Acompanha arroz branco e batata frita.',
        ingredients: 'Filé mignon, molho de tomate caseiro, muçarela, arroz, batata frita',
        imageUrl: 'https://images.unsplash.com/photo-1632778149975-420e0e75ee6d?w=500',
        categoryId: pratosPrincipais.id,
      },
      {
        name: 'Risoto de Cogumelos',
        price: 56.00,
        description: 'Risoto cremoso de funghi secchi com queijo parmesão fresco ralado na hora. Opção vegetariana.',
        ingredients: 'Arroz arbóreo, funghi secchi, manteiga, vinho branco, parmesão',
        imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500',
        categoryId: pratosPrincipais.id,
      },
      {
        name: 'Picanha Grelhada',
        price: 79.90,
        description: 'Picanha premium grelhada no ponto, fatiada na tábua. Acompanha arroz, farofa crocante e vinagrete.',
        ingredients: 'Picanha, sal grosso, arroz, farofa de manteiga, vinagrete',
        imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=500',
        categoryId: pratosPrincipais.id,
      },
      {
        name: 'Salmão Grelhado',
        price: 72.00,
        description: 'Filé de salmão grelhado com crosta de ervas finas, servido com purê de batata e legumes salteados.',
        ingredients: 'Salmão, ervas finas, batata, manteiga, legumes da estação',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
        categoryId: pratosPrincipais.id,
      },
      {
        name: 'Frango à Mostarda',
        price: 48.90,
        description: 'Peito de frango grelhado ao molho de mostarda Dijon com ervas. Acompanha arroz integral e legumes.',
        ingredients: 'Peito de frango, mostarda Dijon, creme de leite, ervas, arroz integral',
        imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500',
        categoryId: pratosPrincipais.id,
      },
      {
        name: 'Costela Assada',
        price: 74.90,
        description: 'Costela bovina assada lentamente por 8 horas até desmanchar. Acompanha mandioca frita e arroz.',
        ingredients: 'Costela bovina, temperos especiais, mandioca, arroz',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
        categoryId: pratosPrincipais.id,
      },

      {
        name: 'Smash Burger Duplo',
        price: 38.90,
        description: 'Dois discos de 90g de blend bovino smashados na chapa, queijo cheddar duplo, cebola caramelizada e molho especial no pão brioche.',
        ingredients: 'Pão brioche, 180g blend bovino, cheddar, cebola, molho da casa',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        categoryId: hamburgueres.id,
      },
      {
        name: 'Burger Bacon Supreme',
        price: 42.90,
        description: 'Hambúrguer artesanal de 180g com bacon crocante, queijo prato derretido, alface americana e tomate. No pão australiano.',
        ingredients: 'Pão australiano, 180g blend bovino, bacon, queijo prato, alface, tomate',
        imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500',
        categoryId: hamburgueres.id,
      },
      {
        name: 'Chicken Burger Crispy',
        price: 36.90,
        description: 'Filé de frango empanado crocante com maionese de ervas, rúcula e tomate seco no pão de gergelim.',
        ingredients: 'Pão gergelim, frango empanado, maionese de ervas, rúcula, tomate seco',
        imageUrl: 'https://images.unsplash.com/photo-1525164286253-04e68b9d94c6?w=500',
        categoryId: hamburgueres.id,
      },
      {
        name: 'Veggie Burger',
        price: 34.90,
        description: 'Hambúrguer de grão-de-bico e quinoa com guacamole, alface crespa e molho tahine. 100% vegano.',
        ingredients: 'Pão integral, grão-de-bico, quinoa, abacate, tahine, alface',
        imageUrl: 'https://images.unsplash.com/photo-1520072959219-c595e76c6a69?w=500',
        categoryId: hamburgueres.id,
      },

      {
        name: 'Espaguete à Carbonara',
        price: 44.90,
        description: 'Espaguete al dente com molho carbonara autêntico de gemas, pecorino romano e guanciale crocante.',
        ingredients: 'Espaguete, gemas, pecorino romano, guanciale, pimenta-do-reino',
        imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500',
        categoryId: massas.id,
      },
      {
        name: 'Fettuccine Alfredo',
        price: 42.00,
        description: 'Fettuccine fresco ao molho branco cremoso com parmesão e noz-moscada.',
        ingredients: 'Fettuccine, creme de leite, manteiga, parmesão, noz-moscada',
        imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500',
        categoryId: massas.id,
      },
      {
        name: 'Lasanha Bolonhesa',
        price: 46.00,
        description: 'Lasanha de massa fresca com camadas generosas de ragù bolonhesa, bechamel e queijos gratinados.',
        ingredients: 'Massa fresca, ragù de carne, molho bechamel, muçarela, parmesão',
        imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500',
        categoryId: massas.id,
      },
      {
        name: 'Penne ao Pesto',
        price: 39.90,
        description: 'Penne al dente com pesto genovês caseiro de manjericão fresco, pinoli e parmesão.',
        ingredients: 'Penne, manjericão fresco, pinoli, parmesão, azeite extra virgem, alho',
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500',
        categoryId: massas.id,
      },

      {
        name: 'Caesar Salad com Frango',
        price: 38.50,
        description: 'Mix de alface romana, croutons crocantes, lascas de parmesão, frango grelhado e molho Caesar da casa.',
        ingredients: 'Alface romana, frango grelhado, parmesão, croutons, molho Caesar',
        imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500',
        categoryId: saladas.id,
      },
      {
        name: 'Salada Mediterrânea',
        price: 36.00,
        description: 'Mix de folhas, tomate grape, pepino, azeitonas pretas, queijo feta e vinagrete de limão siciliano.',
        ingredients: 'Mix de folhas, tomate grape, pepino, azeitonas, queijo feta, limão siciliano',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500',
        categoryId: saladas.id,
      },
      {
        name: 'Bowl Tropical',
        price: 40.00,
        description: 'Bowl refrescante com quinoa, manga, abacate, edamame, cenoura ralada e molho de gengibre.',
        ingredients: 'Quinoa, manga, abacate, edamame, cenoura, gengibre, gergelim',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
        categoryId: saladas.id,
      },

      {
        name: 'Coca-Cola',
        price: 7.90,
        description: 'Lata 350ml gelada.',
        ingredients: 'Água gaseificada, açúcar, extrato de cola, cafeína',
        imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500',
        categoryId: bebidas.id,
      },
      {
        name: 'Guaraná Antarctica',
        price: 7.90,
        description: 'Lata 350ml gelada. O sabor do Brasil.',
        ingredients: 'Água gaseificada, açúcar, extrato de guaraná',
        imageUrl: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500',
        categoryId: bebidas.id,
      },
      {
        name: 'Suco de Laranja Natural',
        price: 13.00,
        description: 'Suco 100% natural de laranjas espremidas na hora (400ml).',
        ingredients: 'Laranjas frescas, gelo',
        imageUrl: 'https://veja.abril.com.br/wp-content/uploads/2024/02/suco-laranja.jpg?crop=1&resize=1212,909',
        categoryId: bebidas.id,
      },
      {
        name: 'Limonada Suíça',
        price: 14.00,
        description: 'Limonada cremosa batida com leite condensado e gelo (400ml).',
        ingredients: 'Limão, leite condensado, gelo, água',
        imageUrl: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=500',
        categoryId: bebidas.id,
      },
      {
        name: 'Cerveja Artesanal Pilsen',
        price: 16.90,
        description: 'Pilsen artesanal local de 500ml, servida extra gelada no copo congelado.',
        ingredients: 'Água, malte de cevada, lúpulo, levedura',
        imageUrl: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=500',
        categoryId: bebidas.id,
      },
      {
        name: 'Água Mineral',
        price: 5.00,
        description: 'Água mineral sem gás (500ml).',
        ingredients: 'Água mineral natural',
        imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500',
        categoryId: bebidas.id,
      },
      {
        name: 'Caipirinha de Limão',
        price: 22.00,
        description: 'A clássica caipirinha brasileira preparada com cachaça premium, limão tahiti e açúcar.',
        ingredients: 'Cachaça, limão tahiti, açúcar, gelo',
        imageUrl: 'https://i.panelinha.com.br/i1/bk-8730-blog-caipirinha-de-limao.webp',
        categoryId: bebidas.id,
      },

      {
        name: 'Brownie com Sorvete',
        price: 26.00,
        description: 'Brownie quentinho de chocolate meio amargo servido com uma bola de sorvete de baunilha e calda de chocolate.',
        ingredients: 'Chocolate meio amargo, farinha, manteiga, ovos, sorvete de baunilha',
        imageUrl: 'https://www.specialita.com/wp-content/uploads/2022/07/brownie-de-chocoavela-com-sorvete.jpg',
        categoryId: sobremesas.id,
      },
      {
        name: 'Pudim de Leite',
        price: 18.00,
        description: 'Pudim de leite condensado cremoso com calda de caramelo. Receita tradicional brasileira.',
        ingredients: 'Leite condensado, leite, ovos, açúcar (caramelo)',
        imageUrl: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=500',
        categoryId: sobremesas.id,
      },
      {
        name: 'Petit Gâteau',
        price: 30.00,
        description: 'Bolinho de chocolate com centro derretido, servido com sorvete de creme e frutas vermelhas.',
        ingredients: 'Chocolate belga, manteiga, ovo, farinha, sorvete de creme',
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
        categoryId: sobremesas.id,
      },
      {
        name: 'Açaí na Tigela',
        price: 24.00,
        description: 'Creme de açaí do Pará com banana, granola artesanal, mel e leite condensado (400ml).',
        ingredients: 'Açaí, banana, granola, mel, leite condensado',
        imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500',
        categoryId: sobremesas.id,
      },
      {
        name: 'Cheesecake de Frutas Vermelhas',
        price: 28.00,
        description: 'Fatia de cheesecake cremoso com base de biscoito amanteigado e cobertura de geleia artesanal de frutas vermelhas.',
        ingredients: 'Cream cheese, biscoito, manteiga, frutas vermelhas, açúcar',
        imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500',
        categoryId: sobremesas.id,
      },
    ],
  });

  const categoriesCount = await prisma.category.count();
  const productsCount = await prisma.product.count();

  console.log('\n✅ Seed completed successfully!');
  console.log(`   📂 ${categoriesCount} categories created`);
  console.log(`   🍽️  ${productsCount} products created`);
}

main()
  .catch((e) => {
    console.error('❌ Error executing seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
