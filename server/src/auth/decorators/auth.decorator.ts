import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { RolesGuard } from '../guards/roles.guard'

export const Auth = () => UseGuards(JwtAuthGuard, RolesGuard)
