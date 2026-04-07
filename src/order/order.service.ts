import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { DraftItemDto } from './dto/draft.item.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class OrderService {
  private readonly TTL_15_MIN = 15 * 60 * 1000;

  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private calculateTotal(draft: any[]): number {
    return draft.reduce((total, item) => {
      return total + Number(item.price) * item.quantity;
    }, 0);
  }

  async addItemToDraft(tableId: string, item: DraftItemDto) {
    const tableExists = await this.prismaService.table.findUnique({
      where: { id: tableId },
    });

    if (!tableExists) {
      throw new NotFoundException('Table not found.');
    }

    const cacheKey = `draft_order:${tableId}`;
    let draft: any[] = (await this.cacheManager.get(cacheKey)) || [];

    const existingItem = draft.find(
      (draftItem) => draftItem.productId === item.productId,
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      const product = await this.prismaService.product.findUnique({
        where: { id: item.productId },
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found.');
      }

      draft.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: item.quantity,
      });
    }

    await this.cacheManager.set(cacheKey, draft, this.TTL_15_MIN);

    return {
      items: draft,
      totalPrice: this.calculateTotal(draft),
    };
  }

  async getDraft(tableId: string) {
    const tableExists = await this.prismaService.table.findUnique({
      where: { id: tableId },
    });

    if (!tableExists) {
      throw new NotFoundException('Table not found.');
    }

    const cacheKey = `draft_order:${tableId}`;
    const draft: any[] = (await this.cacheManager.get(cacheKey)) || [];

    return {
      items: draft,
      totalPrice: this.calculateTotal(draft),
    };
  }

  async finalizeOrder(tableId: string) {
    const tableExists = await this.prismaService.table.findUnique({
      where: { id: tableId },
    });

    if (!tableExists) {
      throw new NotFoundException('Table not found.');
    }

    const cacheKey = `draft_order:${tableId}`;
    const draftItems = (await this.cacheManager.get(cacheKey)) as
      | any[]
      | undefined;

    if (!draftItems || draftItems.length === 0) {
      throw new BadRequestException('Order is empty or session has expired.');
    }

    const newOrder = await this.prismaService.order.create({
      data: {
        tableId: tableId,
        orderItems: {
          create: draftItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
        totalPrice: this.calculateTotal(draftItems),
      },
      include: { orderItems: true },
    });

    await this.cacheManager.del(cacheKey);

    return newOrder;
  }

  async updateDraftItem(tableId: string, productId: string, quantity: number) {
    const tableExists = await this.prismaService.table.findUnique({
      where: { id: tableId },
    });

    if (!tableExists) {
      throw new NotFoundException('Table not found.');
    }

    const cacheKey = `draft_order:${tableId}`;
    const draft: any[] = (await this.cacheManager.get(cacheKey)) || [];

    const itemIndex = draft.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in draft.');
    }

    if (quantity <= 0) {
      throw new BadRequestException(
        'Quantity must be greater than zero. Use remove to delete the item.',
      );
    }

    draft[itemIndex].quantity = quantity;
    await this.cacheManager.set(cacheKey, draft, this.TTL_15_MIN);

    return {
      items: draft,
      totalPrice: this.calculateTotal(draft),
    };
  }

  async removeDraftItem(tableId: string, productId: string) {
    const tableExists = await this.prismaService.table.findUnique({
      where: { id: tableId },
    });

    if (!tableExists) {
      throw new NotFoundException('Table not found.');
    }

    const cacheKey = `draft_order:${tableId}`;
    let draft: any[] = (await this.cacheManager.get(cacheKey)) || [];

    const itemExists = draft.some((item) => item.productId === productId);
    if (!itemExists) {
      throw new NotFoundException('Item not found in draft.');
    }

    draft = draft.filter((item) => item.productId !== productId);

    if (draft.length === 0) {
      await this.cacheManager.del(cacheKey);
    } else {
      await this.cacheManager.set(cacheKey, draft, this.TTL_15_MIN);
    }

    return {
      items: draft,
      totalPrice: this.calculateTotal(draft),
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const take = Number(limit);
      const skip = (Number(page) - 1) * take;

      const [orders, totalItems] = await Promise.all([
        this.prismaService.order.findMany({
          skip,
          take,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            orderItems: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    price: true,
                    imageUrl: true,
                  },
                },
              },
            },
          },
        }),
        this.prismaService.order.count(),
      ]);

      const totalPages = Math.ceil(totalItems / take);

      return {
        data: orders,
        meta: {
          totalItems,
          totalPages,
          currentPage: Number(page),
          itemsPerPage: take,
          hasNextPage: Number(page) < totalPages,
          hasPreviousPage: Number(page) > 1,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal server error while finding products',
      );
    }
  }

  async removeOrder(id: string) {
    try {
      return await this.prismaService.order.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Order not found');
      }

      throw new InternalServerErrorException(
        'Internal server error while deleting order',
      );
    }
  }
}
