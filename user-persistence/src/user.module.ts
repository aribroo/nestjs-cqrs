import { Module } from '@nestjs/common';
import { RmqModule } from './providers/queue/rabbbitmq/rmq.module';
import { USER_SEARCH_CONSUMER } from './common/constants/service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import configs from './common/configs';
import { DatabaseModule } from './databases/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      ignoreEnvFile: false,
      isGlobal: true,
      envFilePath: '.env',
    }),
    RmqModule.register({ name: USER_SEARCH_CONSUMER }),
    DatabaseModule,
    RmqModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export default class UserModule {}
