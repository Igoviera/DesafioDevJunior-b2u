import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist/decorators';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UserDto } from './userDto/user.dto';

@Controller('user')
@ApiTags('Usuários')
export class UserController {
    constructor(private readonly userService: UserService ){}

    @Post()
    @ApiOperation({summary: 'Cadastrar usuário'})
    @ApiResponse({status:200, description:'Usuário criado com sucesso'})
    async createUser(@Body() data: UserDto ){
        return await this.userService.createUser(data)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({summary: 'Lista usuario por ID'})
    @ApiResponse({status:200, description:'Usuário retornado com sucesso'})
    async findById(@Param('id') id: string){
        return await this.userService.findById(id)
    }
}
