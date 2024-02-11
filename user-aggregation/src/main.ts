import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import UserModule from './user.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UserModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);
  app.enableCors();

  const env: string = configService.get<string>('app.appEnv');
  const appName: string = configService.get<string>('app.appName');
  const host = configService.get('app.host');
  const port = configService.get('app.port.api');

  const swaggerConfig: any = configService.get<any>('swagger.config');

  if (swaggerConfig.swaggerUI === true) {
    const config = new DocumentBuilder()
      .setTitle(swaggerConfig.info.title)
      .setDescription(swaggerConfig.info.setDescription)
      .setVersion(swaggerConfig.info.setVersion)
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(swaggerConfig.documentationPath, app, document);
  }
  await app.listen(port, host);
  const appUrl = await app.getUrl();

  console.log(`\n`);
  console.log(`APP NAME\t: ${appName}`);
  console.log(`ENVIRONMENT\t: ${env}`);
  console.log(`RUNNING ON \t: ${appUrl}`);

  if (swaggerConfig.swaggerUI === true) {
    console.log(`SWAGGER UI\t: ${appUrl}/${swaggerConfig.documentationPath}`);
  }
}
bootstrap();
