import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NumberProductsService } from './number-products.service';
import { CreateNumberProductDto } from './dto/create-number-product.dto';
import { UpdateNumberProductDto } from './dto/update-number-product.dto';

@Controller('number-products')
export class NumberProductsController {
  constructor(private readonly numberProductsService: NumberProductsService) {}

  @Post()
  create(@Body() createNumberProductDto: CreateNumberProductDto) {
    return this.numberProductsService.create(createNumberProductDto);
  }

  @Get()
  findAll() {
    return this.numberProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.numberProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNumberProductDto: UpdateNumberProductDto) {
    return this.numberProductsService.update(+id, updateNumberProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.numberProductsService.remove(+id);
  }
}
