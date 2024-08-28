import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { sanitizeUser } from 'src/common/utils/sanitizeUser';
import * as argon2 from 'argon2';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(private readonly prismaService: PrismaService) {}

  async onApplicationBootstrap() {
    const admin = await this.prismaService.user.findFirst({
      where: {
        username: 'admin',
      },
    });

    if (!admin) {
      const hashedPassword = await argon2.hash('2Opql9mIxD');
      await this.prismaService.user.create({
        data: {
          username: 'admin',
          hash: hashedPassword,
          role: 'ADMIN',
        },
      });
    }
  }

  async getSanitizedUser(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return sanitizeUser(user);
  }
}
