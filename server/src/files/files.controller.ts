import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFiles,
	Query,
	HttpCode,
	BadRequestException,
} from '@nestjs/common'
import { FilesService } from './files.service'
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { mimeImageTypes } from './files.const'

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post()
	@HttpCode(200)
	@UseInterceptors(
		AnyFilesInterceptor({
			storage: diskStorage({
				destination: './static',
				filename(req, file, cb) {
					cb(
						null,
						path.join(
							req.query.folder +
								'/' +
								uuidv4() +
								path.extname(file.originalname),
						),
					)
				},
			}),
			fileFilter(req, file, cb) {
				const accept = mimeImageTypes.includes(file.mimetype)
				cb(null, accept)
			},
		}),
	)
	uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
		return this.filesService.upload(files)
	}

	// @Get()
	// findAll() {
	// 	return this.filesService.findAll()
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.filesService.findOne(+id)
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
	// 	return this.filesService.update(+id, updateFileDto)
	// }

	@Delete()
	remove(@Query('file') file: string) {
		return this.filesService.remove(file)
	}
}
