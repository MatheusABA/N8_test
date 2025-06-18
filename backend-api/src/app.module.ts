/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [
    SalesModule
  ],
  controllers: [],
  providers: [
    PrismaService
  ],
})
export class AppModule {}
