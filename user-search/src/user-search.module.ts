import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { RmqModule } from './providers/queue/rabbbitmq/rmq.module';
import { SEARCH } from './common/constants/service';
import { UserSearchController } from './user-search.controller';
import { UserSearchService } from './user-search.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configs from './common/configs';
import { DatabaseModule } from './databases/database.module';
import { RmqService } from './providers/queue/rabbbitmq/rmq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      ignoreEnvFile: false,
      isGlobal: true,
      envFilePath: '.env',
    }),
    ElasticsearchModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        node: configService.get<string>('elasticsearch.node'),
        maxRetries: configService.get<number>('elasticsearch.maxRetries'),
        requestTimeout: configService.get<number>(
          'elasticsearch.requestTimeout',
        ),
        pingTimeout: configService.get<number>('elasticsearch.pingTimeout'),
        sniffOnStart: configService.get<boolean>('elasticsearch.sniffOnStart'),
      }),

      inject: [ConfigService],
    }),
    RmqModule.register({ name: SEARCH }),
  ],
  controllers: [UserSearchController],
  providers: [UserSearchService],
})
export default class UserModule {}
