import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { StocksModule } from './stocks/stocks.module'
import { UserModule } from './user/user.module'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './product/product.module'
import { NumberProductsModule } from './number-products/number-products.module'
import { FilesModule } from './files/files.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		StocksModule,
		CategoryModule,
		ProductModule,
		NumberProductsModule,
		FilesModule,
	],
})
export class AppModule {}
