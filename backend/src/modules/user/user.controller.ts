import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/decorators/params/User.decorator';
import { UserAccessTokenData } from 'src/common/types/user.types';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AccessTokenGuard)
  async me(@User() user: UserAccessTokenData) {
    return this.userService.getSanitizedUser(user.sub);
  }
}
