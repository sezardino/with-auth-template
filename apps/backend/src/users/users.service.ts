import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { eq, ilike } from 'drizzle-orm';
import { users } from 'drizzle/schema';
import { DRIZZLE, DrizzleDBSchema } from 'src/drizzle/drizzle.module';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private readonly drizzle: DrizzleDBSchema) {}

  async createUser(dto: CreateUserDto) {
    const { password, login, ...restDto } = dto;

    const hashedPassword = await hash(password);

    await this.drizzle.insert(users).values({
      password: hashedPassword,
      login: login.toLowerCase(),
      ...restDto,
    });
  }

  async findOne(filter: { id?: string; login?: string }) {
    if (!filter.id && !filter.login)
      throw new BadRequestException('Id or login should be provided');

    if (filter.id && filter.login)
      throw new BadRequestException('Only one filter should be provided');

    const where = filter.id
      ? eq(users.id, filter.id)
      : ilike(users.login, filter.login);

    return await this.drizzle.query.users.findFirst({
      where,
      columns: { id: true, login: true, password: true },
    });
  }
}
