import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { sanitizeUser } from 'src/common/utils/sanitizeUser';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSanitizedUser(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return sanitizeUser(user);
  }
}
