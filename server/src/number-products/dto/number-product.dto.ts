import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateNumberProductDto {
	@IsString()
	@IsNotEmpty()
	productId: string

	@IsString()
	@IsNotEmpty()
	stockId: string

	@IsNumber()
	@IsNotEmpty()
	quantity: number
}
