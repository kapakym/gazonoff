import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
	Req,
	UploadedFiles,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Query,
} from '@nestjs/common'
import { ProductService } from './product.service'
import {
	CreateProductDto,
	MoveProductsDto,
	UpdateProductDto,
} from './dto/product.dto'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { Role } from 'src/auth/roles/role.enum'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { Request, Express } from 'express'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Roles(Role.Admin)
	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto)
	}

	@Roles(Role.Admin)
	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/move')
	move(@Body() dto: MoveProductsDto) {
		return this.productService.move(dto)
	}

	@Get('id')
	findOne(@Query('id') id: string) {
		return this.productService.findOne(id)
	}

	@Get('category')
	getProductsFromCategory(@Query('id') id: string) {
		return this.productService.getProductsFromCategory(id)
	}

	@Get()
	findAll() {
		return this.productService.findAll()
	}

	@Get('quantity')
	findAllWithQuantity() {
		return this.productService.findAllWithQuantity()
	}

	@Patch('')
	@Roles(Role.Admin)
	@Auth()
	update(@Query('id') id: string, @Body() dto: UpdateProductDto) {
		return this.productService.update(id, dto)
	}

	@Delete(':id')
	@Roles(Role.Admin)
	@Auth()
	remove(@Param('id') id: string) {
		return this.productService.remove(id)
	}
}
