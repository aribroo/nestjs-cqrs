import {
  Controller,
  Get,
  Delete,
  Post,
  Param,
  Patch,
  Body,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, UserId } from './common/interface/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<IUser[] | []> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UserId): Promise<IUser | null> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: UserId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser | null> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UserId) {
    return this.userService.remove(id);
  }
}
