import { BadRequestException, Injectable } from '@nestjs/common'
import { log } from 'console'
import * as fs from 'fs'
import { join } from 'path'
import v4 from 'uuid'

@Injectable()
export class FilesService {
	upload(files: Express.Multer.File[]) {
		return files.map(item => ({ url: item.filename, name: item.originalname }))
	}

	// findAll() {
	// 	return `This action returns all files`
	// }
	// findOne(id: number) {
	// 	return `This action returns a #${id} file`
	// }
	// update(id: number, updateFileDto: UpdateFileDto) {
	// 	return `This action updates a #${id} file`
	// }
	remove(file: string) {
		if (!file) {
			throw new BadRequestException('Bad params')
		}
		const removePath = join(__dirname, '..', '..', '/static', file)
		try {
			fs.rmSync(removePath)
			return file
		} catch (error) {
			throw new BadRequestException('Error deleting file')
		}
	}
}
