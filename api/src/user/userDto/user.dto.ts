import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsNotEmpty({message:'O nome é obrigatorio'})
    @ApiProperty()
    name: string

    @IsNotEmpty({message:'O e-mail é obrigatoria'})
    @ApiProperty()
    email: string

    @IsNotEmpty({message:'A senha é obrigatoria'})
    password: string

    @IsNotEmpty({message:'O  telefone é obrigatorio'})
    @ApiProperty()
    phone: string


}