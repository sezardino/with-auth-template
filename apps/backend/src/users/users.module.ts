import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DrizzleModule, ProfilesModule],
  exports: [UsersService],
})
export class UsersModule {}
