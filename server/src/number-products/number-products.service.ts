import { Injectable } from '@nestjs/common'
import { CreateNumberProductDto } from './dto/number-product.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class NumberProductsService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateNumberProductDto) {
		console.log(dto)
		const afterQuantity = await this.prisma.quantityProducts.findFirst({
			where: {
				productId: dto.productId,
				AND: {
					stockId: dto.stockId,
				},
			},
		})
		if (afterQuantity) {
			const newQuantity = this.prisma.quantityProducts.update({
				where: { id: afterQuantity.id },
				data: {
					quantity: dto.quantity,
				},
			})
			console.log(newQuantity)
			return newQuantity
		}
		const quantity = this.prisma.quantityProducts.create({
			data: {
				quantity: dto.quantity,
				stockId: dto.stockId,
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
