import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	HttpCode,
	ValidationPipe,
	Query,
} from '@nestjs/common'
import { NumberProductsService } from './number-products.service'
import { CreateNumberProductDto } from './dto/number-product.dto'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { Role } from 'src/auth/roles/role.enum'

@Controller('number-products')
export class NumberProductsController {
	constructor(private readonly numberProductsService: NumberProductsService) {}

	@Roles(Role.Admin)
	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	create(@Body() createNumberProductDto: CreateNumberProductDto) {
		return this.numberProductsService.create(createNumberProductDto)
	}

	@Get()
	findAll() {
		return this.numberProductsService.findAll()
	}

	@Get('/byid')
	findOne(@Query('id') id: string) {
		return this.numberProductsService.findOne(id)
	}

	// @Patch(':id')
	// update(
	// 	@Param('id') id: string,
	// 	@Body() updateNumberProductDto: UpdateNumberProductDto,
	// ) {
	// 	return this.numberProductsService.update(+id, updateNumberProductDto)
	// }

	@Delete()
	remove(@Query('id') id: string) {
		return this.numberProductsService.remove(id)
	}
}
