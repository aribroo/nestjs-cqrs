import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import {
  BadRequestException,
  Controller,
  NotFoundException,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { UserSearchService } from './user-search.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, UserId } from './common/interface/user.interface';

@Controller('userSearch')
export class UserSearchController {
  constructor(private readonly userSearchService: UserSearchService) {}

  @EventPattern('create-user')
  async create(@Payload() payload: CreateUserDto): Promise<void> {
    this.userSearchService.create(payload);
  }

  @MessagePattern('list-user')
  async getUserList() {
    return this.userSearchService.findAll();
  }
  @MessagePattern('find-user')
  async get(@Payload() id: UserId): Promise<IUser | null> {
    return this.userSearchService.findOne(id);
  }

  @MessagePattern('remove-user')
  async delete(@Payload() id: UserId): Promise<void> {
    this.userSearchService.remove(id);
  }

  @MessagePattern('update-user')
  async update(@Payload() payload: any): Promise<void> {
    this.userSearchService.update(payload);
  }
}
