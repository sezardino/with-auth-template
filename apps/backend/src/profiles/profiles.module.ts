import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  controllers: [ProfilesController],
  imports: [DrizzleModule],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
