import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateProductDto) {
		const isProduct = await this.prisma.products.findUnique({
			where: {
				name: dto.name,
			},
		})
		if (isProduct) {
			throw new BadRequestException('Product is alredy exists')
		}
		const product = await this.prisma.products.create({
			data: {
				...dto,
				categoryId: dto.categoryId === 'root' ? null : dto.categoryId,
			},
		})
		return product
	}

	async findAll() {
		const products = await this.prisma.products.findMany()
		return products
	}

	async findOne(id: string) {
		const product = await this.prisma.products.findUnique({ where: { id } })
		return product
	}

	async getProductsFromCategory(id: string) {
		const products = await this.prisma.products.findMany({
			where: { categoryId: id === 'root' ? null : id },
		})
		console.log('dfdssdfdsf', products)
		return products
	}

	async update(id: string, dto: UpdateProductDto) {
		const product = await this.prisma.products.update({
			where: { id },
			data: dto,
		})
		return product
	}

	async remove(id: string) {
		await this.prisma.products.delete({ where: { id } })
		return true
	}
}
