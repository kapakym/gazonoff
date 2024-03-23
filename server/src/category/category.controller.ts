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
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { Role } from 'src/auth/roles/role.enum'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Roles(Role.Admin)
	@Auth()
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoryService.create(createCategoryDto)
	}

	@Get()
	findAll() {
		return this.categoryService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoryService.findOne(id)
	}

	@Get('withchidren/:id')
	findOneWithChidren(@Param('id') id: string) {
		return this.categoryService.findOneWithChildren(id)
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	@Roles(Role.Admin)
	@Auth()
	update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return this.categoryService.update(id, updateCategoryDto)
	}

	@UsePipes(new ValidationPipe())
	@Delete(':id')
	@Roles(Role.Admin)
	@Auth()
	remove(@Param('id') id: string) {
		return this.categoryService.remove(id)
	}
}
