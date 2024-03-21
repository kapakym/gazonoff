import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStockDto {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsString()
	address: string
}

export type UpdateStockDto = Partial<CreateStockDto>
