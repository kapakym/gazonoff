import { Test, TestingModule } from '@nestjs/testing';
import { NumberProductsController } from './number-products.controller';
import { NumberProductsService } from './number-products.service';

describe('NumberProductsController', () => {
  let controller: NumberProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NumberProductsController],
      providers: [NumberProductsService],
    }).compile();

    controller = module.get<NumberProductsController>(NumberProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
