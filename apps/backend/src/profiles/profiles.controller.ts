import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(AccessTokenGuard)
  @Get('')
  currentUserProfile(@Request() req) {
    return this.profilesService.userProfile(req.user.id);
  }
}
