import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsNumber()
	price?: number

	photos?: string[]

	@IsString()
	photoMain?: string

	@IsString()
	description?: string

	@IsNumber()
	raiting?: number

	byThis?: string[]

	@IsString()
	vendor_code?: string

	params: string

	@IsBoolean()
	new?: boolean

	@IsBoolean()
	bestsellers?: boolean

	@IsString()
	categoryId: string
}

export type UpdateProductDto = Partial<CreateProductDto>
