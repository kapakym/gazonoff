import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Res,
	Req,
	UnauthorizedException,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Response, Request } from 'express'
import { log } from 'console'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// @UsePipes(new ValidationPipe())
	// @HttpCode(200)
	// @Post('login/user')
	// async userLogin(@Body() dto: AuthDto) {
	// 	return this.authService.loginUser(dto)
	// }

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/admin/register')
	async registerAdmin(
		@Body() dto: AuthDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { refreshToken, ...response } = await this.authService.register(dto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)
		return response
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/admin/login')
	async loginAdmin(
		@Body() dto: AuthDto,
		@Res({ passthrough: true }) res: Response,
		@Req() req: Request,
	) {
		const { refreshToken, ...response } = await this.authService.login(dto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)
		return response
	}

	@HttpCode(200)
	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		this.authService.removeRefreshTokenToResponse(res)

		return true
	}

	@HttpCode(200)
	@Post('login/access-token')
	async getNewToken(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const refreshTokenFromCookies =
			req.cookies[this.authService.REFRESH_TOKEN_NAME]

		if (!refreshTokenFromCookies) {
			this.authService.removeRefreshTokenToResponse(res)
			throw new UnauthorizedException('Refresh token not passed')
		}

		const { refreshToken, ...response } = await this.authService.getNewTokens(
			refreshTokenFromCookies,
		)
		return response
	}
}
