import { IsOptional, IsString } from 'class-validator'

export class CreateCategoryDto {
	@IsString()
	name: string

	@IsString()
	@IsOptional()
	parentId?: string
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>
