import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    appEnv: process.env.APP_ENV || 'dev',
    appName: process.env.APP_NAME || 'user-persistence',
  }),
);
