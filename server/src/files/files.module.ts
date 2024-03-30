import { Module } from '@nestjs/common'
import { FilesService } from './files.service'
import { FilesController } from './files.controller'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ConfigService } from '@nestjs/config'

@Module({
	controllers: [FilesController],
	providers: [FilesService],
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', '/static'),
			serveRoot: '/static',
		}),
	],
})
export class FilesModule {}
