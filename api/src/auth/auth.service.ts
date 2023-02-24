import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()

export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } })

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined
                }
            }
        }
    }

    async login(userData) {
        const payload = {
            email: userData.email,
            name: userData.name,
            sub: userData.id,
        }
        const token = await this.jwtService.sign(payload);
        return {
            access_token: token,
        }
    }
}
