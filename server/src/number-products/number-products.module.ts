import { Module } from '@nestjs/common'
import { NumberProductsService } from './number-products.service'
import { PrismaService } from 'src/prisma.service'
import { NumberProductsController } from './number-products.controller'

@Module({
	controllers: [NumberProductsController],
	providers: [NumberProductsService, PrismaService],
})
export class NumberProductsModule {}
