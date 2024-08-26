import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SanitizedUser } from 'src/common/types/user.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getTokens({ id, ...rest }: SanitizedUser): Promise<any> {
    const payload = { sub: id, ...rest };

    const accessToken = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '1d',
    });

    return { accessToken };
  }
}
