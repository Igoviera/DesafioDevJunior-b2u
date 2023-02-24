import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './userDto/user.dto';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    async createUser(data: UserDto){
        data.password = this.hashPassword(data.password)
        const userExiste = await this.prisma.user.findFirst({
            where:{
                email: data.email
            }
        })

        if(userExiste){
            throw new BadRequestException('O email já existe.')
        }

       return await this.prisma.user.create({data:data})
    }

    findUserByEmail(email: string){
        return this.prisma.user.findFirst({
            where:{
                email: email
            }
        })
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where:{
                id
            },
             include:{
                cars:true
             }
        })
    }

    hashPassword(password: string) {
        const salt = genSaltSync(10)
        return hashSync(password, salt)
    }
}
