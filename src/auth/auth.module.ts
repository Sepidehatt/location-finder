import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.SECRET_TOKEN,
      signOptions: { expiresIn: "6h" }
    })
  })],
  controllers: [AuthController],
  providers: [AuthService,]
})
export class AuthModule { }
