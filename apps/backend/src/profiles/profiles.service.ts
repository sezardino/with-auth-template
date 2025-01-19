import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
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

  async userProfile(userId: string) {
    const neededProfile = await this.drizzle.query.profiles.findFirst({
      where: eq(profiles.userId, userId),
      columns: {
        id: true,
        name: true,
      },
    });

    if (!neededProfile) throw new NotFoundException('Profile not found');

    return neededProfile;
  }
}
