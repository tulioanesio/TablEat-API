import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [PrismaModule, ProductModule, CategoryModule, MenuModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
