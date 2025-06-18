/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [
    SalesController
  ],
  providers: [
    SalesService,
    PrismaService
  ],
})
export class SalesModule {}