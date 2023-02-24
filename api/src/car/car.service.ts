import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CarDto } from './carDto/car.dto';

@Injectable()
export class CarService {
    constructor(private readonly prisma: PrismaService) { }

    async create(req, data: CarDto) {
        return await this.prisma.car.create({
            data:{
                name: data.name,
                marca: data.marca,
                ano: data.ano,
                descricao: data.descricao,
                userId: req.user.id
            }
        })
    }

    async findAll() {
        return await this.prisma.car.findMany({
            include:{
                user:true
            }
        })
    }

    async findById(id: string) {
        const cardExiste = await this.prisma.car.findUnique({
            where: {
                id: id
            }
        })

        if (!cardExiste) {
            throw new BadRequestException('Carro não encontrado')
        }

        return await this.prisma.car.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: string, data: CarDto) {
        const carExiste = await this.prisma.car.findFirst({
            where: {
                id
            }
        })

        if (!carExiste) {
            throw new BadRequestException('Carro não encontrado')
        }
        return await this.prisma.car.update({
            data,
            where: { id }
        })
    }

    async delete(id: string) {
        return await this.prisma.car.delete({
            where: {
                id
            }
        })
    }
}
