import { Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)    
    @Post('login')
    @ApiOperation({summary: 'Fazer login'})
    @ApiResponse({status:200, description:'Login efetuado com sucesso'})
    async login(@Request() req: any) {
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    @ApiOperation({summary: 'Ver quem esta logado'})
    async getMe(@Request() req: any) {
        return req.user
    }
}
