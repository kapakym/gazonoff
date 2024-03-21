import { PartialType } from '@nestjs/mapped-types';
import { CreateNumberProductDto } from './create-number-product.dto';

export class UpdateNumberProductDto extends PartialType(CreateNumberProductDto) {}
