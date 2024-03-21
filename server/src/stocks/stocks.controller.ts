import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	HttpCode,
} from '@nestjs/common'
import { StocksService } from './stocks.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { Role } from 'src/auth/roles/role.enum'
import { CreateStockDto, UpdateStockDto } from './dto/stock.dto'

@Controller('stocks')
export class StocksController {
	constructor(private readonly stocksService: StocksService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Roles(Role.Admin)
	@Auth()
	create(@Body() dto: CreateStockDto) {
		return this.stocksService.create(dto)
	}

	@Get()
	findAll() {
		return this.stocksService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.stocksService.findOne(id)
	}

	@Patch(':id')
	@Roles(Role.Admin)
	@Auth()
	update(@Param('id') id: string, @Body() dto: UpdateStockDto) {
		return this.stocksService.update(id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Delete(':id')
	@Roles(Role.Admin)
	@Auth()
	remove(@Param('id') id: string) {
		console.log('****-->>', id)
		return this.stocksService.remove(id)
	}
}
