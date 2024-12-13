import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './strategy';

@Module({
  imports:[PrismaModule,JwtModule.register({})],
  providers: [AuthService,JwtService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
