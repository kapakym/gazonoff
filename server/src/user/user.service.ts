import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { hash } from 'argon2'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(dto: AuthDto) {
		const user = {
			...dto,
			password: await hash(dto.password),
			name: '',
		}
		return this.prisma.users.create({
			data: user,
		})
	}

	findAll() {
		return `This action returns all user`
	}

	getById(id: string) {
		return this.prisma.users.findUnique({
			where: { id },
		})
	}

	getByEmail(email: string) {
		return this.prisma.users.findUnique({
			where: { email },
		})
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
