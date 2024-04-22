import { Injectable } from '@nestjs/common'
import { CreateNumberProductDto } from './dto/number-product.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class NumberProductsService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateNumberProductDto) {
		const afterQuantity = await this.prisma.quantityProducts.findFirst({
			where: {
				productId: dto.productId,
				AND: {
					stockId: dto.stockId,
				},
			},
		})
		if (afterQuantity) {
			this.prisma.quantityProducts.update({
				where: { id: afterQuantity.id },
				data: {
					quantity: afterQuantity.quantity + dto.quantity,
				},
			})
			return afterQuantity
		}
		const quantity = this.prisma.quantityProducts.create({
			data: {
				quantity: dto.quantity,
				stockId: dto.productId,
				productId: dto.productId,
			},
		})
		return quantity
	}

	findAll() {
		const quantity = this.prisma.quantityProducts.findMany()
		return quantity
	}

	findOne(id: string) {
		const quantity = this.prisma.quantityProducts.findUnique({
			where: {
				id,
			},
		})
		return quantity
	}

	// update(id: number, updateNumberProductDto: UpdateNumberProductDto) {
	// return `This action updates a #${id} numberProduct`

	remove(id: string) {
		this.prisma.quantityProducts.delete({ where: { id } })
		return true
	}
}
