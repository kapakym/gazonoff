import { Injectable } from '@nestjs/common';
import { CreateNumberProductDto } from './dto/create-number-product.dto';
import { UpdateNumberProductDto } from './dto/update-number-product.dto';

@Injectable()
export class NumberProductsService {
  create(createNumberProductDto: CreateNumberProductDto) {
    return 'This action adds a new numberProduct';
  }

  findAll() {
    return `This action returns all numberProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} numberProduct`;
  }

  update(id: number, updateNumberProductDto: UpdateNumberProductDto) {
    return `This action updates a #${id} numberProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} numberProduct`;
  }
}
