import { BadRequestException, Injectable } from '@nestjs/common'
import type { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateCategoryDto) {
		const isCategory = await this.prisma.category.findUnique({
			where: {
				name: dto.name,
			},
		})
		if (isCategory) {
			throw new BadRequestException('Stock is alredy exists')
		}

		const category = this.prisma.category.create({ data: dto })
		return category
	}

	findAll() {
		const categories = this.prisma.category.findMany()
		return categories
	}

	findOne(id: string) {
		const category = this.prisma.category.findUnique({ where: { id } })
		return category
	}

	async findOneWithChildren(id: string) {
		const category = await this.prisma.category.findUnique({ where: { id } })
		const childrens = await this.prisma.category.findMany({
			where: {
				parentId: category.id,
			},
		})
		const result = {
			category,
			childrens,
		}
		return result
	}

	update(id: string, dto: UpdateCategoryDto) {
		const category = this.prisma.category.update({
			where: {
				id,
			},
			data: dto,
		})
		return category
	}

	async remove(id: string) {
		await this.prisma.category.delete({ where: { id } })
		return true
	}
}
