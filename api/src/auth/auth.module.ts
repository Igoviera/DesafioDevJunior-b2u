import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategys/local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './strategys/jwt.strategy';

@Module({
  imports:[UserModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '24h'
    },
  })],
  controllers:[AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
