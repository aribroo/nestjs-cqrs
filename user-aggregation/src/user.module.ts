import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Configs from 'src/common/configs/index';
import { UserController } from './user.controller';
import { RmqModule } from 'src/providers/queue/rabbitmq/rmq.module';
import {
  USER_CONSUMER,
  USER_SEARCH_CONSUMER,
} from 'src/common/constants/services';
import { UserService } from './user.service';

@Module({
  imports: [
    RmqModule.register({ name: USER_CONSUMER }),
    RmqModule.register({ name: USER_SEARCH_CONSUMER }),
    ConfigModule.forRoot({
      load: Configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    RmqModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export default class UserModule {}
