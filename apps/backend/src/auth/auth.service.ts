import { ForbiddenException, Injectable } from '@nestjs/common';
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
}
