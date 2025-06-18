/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.debug('Conectado ao banco de dados SQLite via Prisma!');
  }
}