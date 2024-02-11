import { NestFactory } from '@nestjs/core';
import UserModule from './user-search.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from './providers/queue/rabbbitmq/rmq.service';
import { RmqOptions } from '@nestjs/microservices';
import { SEARCH } from './common/constants/service';
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
  const elasticNode: string = configService.get<string>('elasticsearch.node');
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions(SEARCH, true));

  await app.startAllMicroservices();
  console.log(`\n`);
  console.log(`APP NAME\t: ${appName}`);
  console.log(`ENVIRONMENT\t: ${env}`);
  console.log(`DATABASE\t: ${elasticNode}`);
}
bootstrap();
