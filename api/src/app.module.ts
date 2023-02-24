import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { PrismaModule } from './prisma.module';
import { UserModule } from './user/user.module';

@Module({
  providers: [],
  controllers: [],
  imports: [PrismaModule, CarModule,UserModule, AuthModule],
})
export class AppModule {}
