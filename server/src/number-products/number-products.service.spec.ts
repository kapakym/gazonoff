import { Test, TestingModule } from '@nestjs/testing';
import { NumberProductsService } from './number-products.service';

describe('NumberProductsService', () => {
  let service: NumberProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NumberProductsService],
    }).compile();

    service = module.get<NumberProductsService>(NumberProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
