import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, UserId } from './common/interface/user.interface';
import { RpcException } from '@nestjs/microservices';

const getDataSource = (data: any) => {
  return data.hits.hits.map((value: any) => value._source);
};

@Injectable()
export class UserSearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  async create(payload: CreateUserDto): Promise<void> {
    try {
      await this.esService.index({
        index: 'users',
        document: payload,
      });
    } catch (err) {
      throw new RpcException(new InternalServerErrorException());
    }
  }

  async findAll(): Promise<IUser[] | []> {
    try {
      let body = {
        query: { match_all: {} },
        _source: {
          excludes: [
            'socialMedia.userId',
            'socialMedia.createdAt',
            'socialMedia.updatedAt',
          ],
        },
      };

      const data = await this.esService.search({
        index: 'users',
        body,
      });
      return getDataSource(data);
    } catch (err) {
      throw new RpcException(new InternalServerErrorException());
    }
  }

  async findOne(id: any): Promise<IUser | null> {
    try {
      const res = await this.esService.search({
        index: 'users',
        query: { match: { id } },
      });

      return getDataSource(res);
    } catch (err) {
      throw new RpcException(new InternalServerErrorException());
    }
  }

  async remove(id: UserId): Promise<void> {
    try {
      await this.esService.deleteByQuery({
        index: 'users',
        query: {
          match: {
            id,
          },
        },
      });
    } catch (err) {
      throw new RpcException(new InternalServerErrorException());
    }
  }

  async update(payload: any): Promise<void> {
    const { id, data } = payload;

    try {
      await this.esService.updateByQuery({
        index: 'users',
        query: {
          term: {
            id,
          },
        },
        script: {
          source: Object.entries(data)
            .map(([key, value]) => `ctx._source.${key} = '${value}'`)
            .join('; '),
          lang: 'painless',
        },
      });
    } catch (err) {
      throw new RpcException(new InternalServerErrorException());
    }
  }
}
