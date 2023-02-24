import { Body, Controller, Delete, Get, Param, Post, Put, Request} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CarService } from './car.service';
import { CarDto } from './carDto/car.dto';

@Controller('car')
@ApiTags('Car')
export class CarController {
    constructor(private readonly carService: CarService) { }

    @UseGuards(JwtAuthGuard)  
    @Post()
    @ApiOperation({summary: 'Cadastrar um carro'})
    @ApiResponse({status:200, description:'Carro cadastrado com sucesso'})
    async create(@Request() req: any, @Body() data: CarDto) {
        return await this.carService.create(req, data)
    }

    @Get()
    @ApiOperation({summary: 'Listar todos os carros'})
    @ApiResponse({status:200, description:'Carro retornado com sucesso'})
    async findAll() {
        return await this.carService.findAll()
    }

    @UseGuards(JwtAuthGuard)  
    @Get(':id')
    @ApiOperation({summary: 'Listar um carro pelo ID'})
    @ApiResponse({status:200, description:'Carro retornado com sucesso'})
    @ApiResponse({status:409, description:'Carro não encontrado'})
    async findById(@Param('id') id: string){
        return await this.carService.findById(id)
    }

    @UseGuards(JwtAuthGuard)  
    @Put(':id')
    @ApiOperation({summary: 'Atualizar os dados de um carro'})
    @ApiResponse({status:200, description:'Carro atualizado com sucesso'})
    @ApiResponse({status:409, description:'Carro não encontrado'})
    async update(@Param('id') id: string, @Body() data: CarDto){
        return await this.carService.update(id, data)
    }

    @UseGuards(JwtAuthGuard)  
    @Delete(':id')
    @ApiOperation({summary: 'Deletar um carro'})
    @ApiResponse({status:204, description:'Carro deletado com sucesso'})
    @ApiResponse({status:409, description:'Carro não encontrado'})
    async delete(@Param('id') id: string){
        return await this.carService.delete(id)
    }
}
