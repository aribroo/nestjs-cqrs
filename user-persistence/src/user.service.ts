import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from './databases/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { USER_SEARCH_CONSUMER } from './common/constants/service';
import { Prisma } from '@prisma/client';
import { IUser, UserId } from './common/interface/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(USER_SEARCH_CONSUMER)
    private readonly userSearchClient: ClientProxy,
  ) {}
  async create(payload: CreateUserDto): Promise<IUser> {
    const { name, email, socialMedia } = payload;
    const socialMediaQuery: Record<string, any> = {};

    if (socialMedia) {
      socialMediaQuery['socialMedia'] = {
        createMany: {
          data: socialMedia,
          skipDuplicates: true,
        },
      };
    }
    try {
      const create = await this.databaseService.user.create({
        data: {
          name,
          email,
          ...socialMediaQuery,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      this.userSearchClient.emit('create-user', create);

      return create;
    } catch (err) {
      Logger.warn(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (
          typeof err.meta?.target === 'string' &&
          err.meta.target.includes('User_email_key')
        ) {
          throw new RpcException(
            new ConflictException('Email is already used!').getResponse(),
          );
        }
      }
      throw new RpcException(new InternalServerErrorException().getResponse());
    }
  }

  async update(id: UserId, data: UpdateUserDto): Promise<IUser | null> {
    try {
      const updated = await this.databaseService.user.update({
        where: { id },
        data,
      });

      this.userSearchClient.emit('update-user', { id, data: updated });

      return updated;
    } catch (err) {
      Logger.error(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.meta?.cause === 'Record to update not found.')
          throw new RpcException(
            new NotFoundException('User not found').getResponse(),
          );
      }

      throw new RpcException(new InternalServerErrorException().getResponse());
    }
  }

  async remove(id: UserId): Promise<any> {
    try {
      await this.databaseService.user.delete({
        where: { id },
        include: { socialMedia: true },
      });

      this.userSearchClient.emit('remove-user', id);

      return {
        message: 'Delete successfully',
        deletedCount: 1,
      };
    } catch (err) {
      Logger.error(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (
          err.code === 'P2025' &&
          err.meta?.cause === 'Record to delete does not exist.'
        )
          throw new RpcException(
            new NotFoundException(
              'Deleted failed. user not found',
            ).getResponse(),
          );
      }
      throw new RpcException(new InternalServerErrorException());
    }
  }
}
