import { ForbiddenException, Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: CreateUserDto) {
    const user = await this.usersService.findOne({ login: dto.login });

    if (user) throw new ForbiddenException('Login already used');

    await this.usersService.createUser(dto);
  }

  async validateLocalUser(login: string, password: string) {
    const user = await this.usersService.findOne({ login });

    if (!user) throw new ForbiddenException('Wrong credentials');

    const isPasswordMatch = await verify(user.password, password);

    if (!isPasswordMatch) throw new ForbiddenException('Wrong credentials');

    return { id: user.id, login: user.login };
  }
}
