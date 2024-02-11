import { registerAs } from '@nestjs/config';

export default registerAs(
  'elasticsearch',
  (): Record<string, any> => ({
    node: process.env.ELASTIC_NODE || 'http://localhost:9200',
    maxRetries: process.env.MAX_RETRIES || 10,
    requestTimeout: process.env.REQUEST_TIMEOUT || 60000,
    pingTimeout: process.env.PING_TIMEOUT || 60000,
    sniffOnStart: process.env.SNIFF_ON_START || true,
  }),
);
