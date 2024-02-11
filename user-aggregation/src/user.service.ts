import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundError, firstValueFrom } from 'rxjs';
import {
  USER_CONSUMER,
  USER_SEARCH_CONSUMER,
} from 'src/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { IUser, UserId } from './common/interface/user.interface';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_CONSUMER) private readonly clientUser: ClientProxy,
    @Inject(USER_SEARCH_CONSUMER)
    private readonly clientUserSearch: ClientProxy,
  ) {}

  /**
   * Command
   */

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const user = await firstValueFrom(
      this.clientUser.send('create-user', createUserDto),
    );

    return user;
  }

  async update(
    id: UserId,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser | null> {
    const response = await firstValueFrom(
      this.clientUser.send('update-user', { id, data: updateUserDto }),
    );

    return response;
  }

  async remove(userId: UserId): Promise<any> {
    const response = await firstValueFrom(
      this.clientUser.send('remove-user', userId),
    );

    return response;
  }

  /**
   * Query
   */

  async findAll(): Promise<IUser[] | []> {
    const listUser = await firstValueFrom(
      this.clientUserSearch.send('list-user', ''),
    );
    return listUser;
  }

  async findOne(id: UserId): Promise<IUser | null> {
    const user = await firstValueFrom(
      this.clientUserSearch.send('find-user', id),
    );

    if (user.length < 1) throw new NotFoundException('User not found');
    return user;
  }
}
