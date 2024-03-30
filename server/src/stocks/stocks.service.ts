import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateStockDto, UpdateStockDto } from './dto/stock.dto'
import { log } from 'console'

@Injectable()
export class StocksService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateStockDto) {
		const isStock = await this.prisma.stock.findUnique({
			where: {
				name: dto.name,
			},
		})
		if (isStock) {
			throw new BadRequestException('Stock is alredy exists')
		}

		const stock = this.prisma.stock.create({ data: dto })
		return stock
	}

	findAll() {
		const stocks = this.prisma.stock.findMany()
		return stocks
	}

	findOne(id: string) {
		const stock = this.prisma.stock.findUnique({ where: { id } })
		return stock
	}

	update(id: string, dto: UpdateStockDto) {
		const stock = this.prisma.stock.update({
			where: {
				id,
			},
			data: dto,
		})
		return stock
	}

	async remove(id: string) {
		await this.prisma.stock.delete({ where: { id } })
		return true
	}
}
