import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    url: 'mysql://root:@localhost:3307/user',
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER || null,
    password: process.env.DATABASE_PASSWORD || null,
    debug: process.env.DATABASE_DEBUG === 'true' || false,
    options: process.env.DATABASE_OPTIONS,
  }),
);
