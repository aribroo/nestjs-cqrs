import { NestFactory } from '@nestjs/core';
import UserModule from './user.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from './providers/queue/rabbbitmq/rmq.service';
import { RmqOptions } from '@nestjs/microservices';

import { USER_CONSUMER } from './common/constants/service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const env: string = configService.get<string>('app.appEnv');
  const appName: string = configService.get<string>('app.appName');
  const mongoUri: string = configService.get<string>('database.host');
  const dbName: string = configService.get<string>('database.name');
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(USER_CONSUMER, true),
  );

  await app.startAllMicroservices();
  console.log(`\n`);
  console.log(`APP NAME\t: ${appName}`);
  console.log(`ENVIRONMENT\t: ${env}`);
  console.log(`DATABASE\t: ${mongoUri}/${dbName}`);
}
bootstrap();
