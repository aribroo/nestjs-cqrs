import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, UserId } from './common/interface/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('create-user')
  async create(@Payload() payload: CreateUserDto): Promise<IUser> {
    return this.userService.create(payload);
  }

  @MessagePattern('update-user')
  async update(@Payload() { id, data }): Promise<IUser | null> {
    return this.userService.update(id, data);
  }

  @MessagePattern('remove-user')
  async delete(@Payload() id: UserId): Promise<any> {
    return this.userService.remove(id);
  }
}
