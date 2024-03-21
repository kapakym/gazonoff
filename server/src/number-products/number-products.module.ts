import { Module } from '@nestjs/common';
import { NumberProductsService } from './number-products.service';
import { NumberProductsController } from './number-products.controller';

@Module({
  controllers: [NumberProductsController],
  providers: [NumberProductsService],
})
export class NumberProductsModule {}
