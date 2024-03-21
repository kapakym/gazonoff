import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { Role } from 'src/auth/roles/role.enum'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	@Roles(Role.Admin)
	@Auth()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto)
	}

	@Get()
	findAll() {
		return this.productService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(id)
	}

	@Patch(':id')
	@Roles(Role.Admin)
	@Auth()
	update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
		return this.productService.update(id, dto)
	}

	@Delete(':id')
	@Roles(Role.Admin)
	@Auth()
	remove(@Param('id') id: string) {
		return this.productService.remove(id)
	}
}
