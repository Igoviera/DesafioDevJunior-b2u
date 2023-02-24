import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty } from 'class-validator';

export class CarDto {
    @IsNotEmpty({message:'O nome é obrigatorio'})
    @ApiProperty()
    name: string

    @IsNotEmpty({message:'A marca é obrigatoria'})
    @ApiProperty()
    marca: string

    @IsNotEmpty({message:'O ano é obrigatorio'})
    @ApiProperty()
    ano: string

    @IsNotEmpty({message:'A descrição é obrigatoria'})
    @ApiProperty()
    descricao: string
}