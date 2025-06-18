/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSale(data: any) {
    try {
      const items = data.items.map((item: any) => ({
        ...item,
        preco: Number(item.preco),
      }));
  
      
      const total = Math.round(
        items.reduce((sum, item) => sum + Number(item.preco) * item.quantity, 0) * 100) / 100;

      return this.prisma.compra.create({
        data: {
          anonUserId: data.anonUserId,
          items,
          total
        },
      });
    } catch (error) {
      console.error('Erro ao criar venda:', error);
      throw new Error('Erro ao registrar a compra!');
    }
  }

  async getSalesByAnonUserId(anonUserId: string) {
    return this.prisma.compra.findMany({ where: { anonUserId } });
  }
}
