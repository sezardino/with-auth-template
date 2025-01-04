import { Inject, Injectable } from '@nestjs/common';
import { profiles } from 'drizzle/schema/profile.schema';
import { DRIZZLE, DrizzleDBSchema } from 'src/drizzle/drizzle.module';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(@Inject(DRIZZLE) private readonly drizzle: DrizzleDBSchema) {}

  async create(dto: CreateProfileDto) {
    return await this.drizzle
      .insert(profiles)
      .values({
        name: dto.name,
        userId: dto.userId,
      })
      .returning();
  }
}
