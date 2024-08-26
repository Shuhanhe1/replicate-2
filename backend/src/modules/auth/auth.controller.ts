import { Body, ConflictException, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../database/prisma.service';
import * as argon2 from 'argon2';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { sanitizeUser } from 'src/common/utils/sanitizeUser';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() body: LoginDto,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (!user) {
      throw new ConflictException('Credentials are invalid');
    }

    if (!(await argon2.verify(user.hash, body.password))) {
      return {
        error: 'Credentials are invalid',
      };
    }

    const sanitizedUser = sanitizeUser(user);
    const tokens = await this.authService.getTokens(sanitizedUser);

    response.cookie('accessToken', tokens.accessToken, {
      // 1 day
      maxAge: 1000 * 60 * 60 * 24,
    });
    return { user: sanitizedUser, tokens };
  }
}
