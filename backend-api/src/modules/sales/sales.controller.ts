/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Query, Logger } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  
  private readonly logger = new Logger(SalesController.name);

  @Post()
  async create(@Body() body: any) {
    this.logger.verbose("Body recebido ao criar uma venda:", JSON.stringify(body, null, 2));
    const sale = await this.salesService.createSale(body);
    return {
      success: true,
      message: 'Compra registrada com sucesso!',
      data: sale,
    }
  }

  @Get()
  async findByAnonUserId(@Query('anonUserId') anonUserId: string) {
    return this.salesService.getSalesByAnonUserId(anonUserId);
  }
}
