import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeywordModule } from './keyword/keyword.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PuzzleModule } from './puzzle/puzzle.module';
import { GoogleImageModule } from './google-image/google-image.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [KeywordModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), PuzzleModule, GoogleImageModule, AuthModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
