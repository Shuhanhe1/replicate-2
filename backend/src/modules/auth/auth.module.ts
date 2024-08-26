import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { PrismaModule } from '../database/prisma.module';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  providers: [AccessTokenStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
