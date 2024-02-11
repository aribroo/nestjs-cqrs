import { registerAs } from '@nestjs/config';

export default registerAs(
  'transport',
  (): Record<string, any> => ({
    rabbitmq: {
      uri: process.env.RABBIT_MQ_URI || 'amqp://localhost:5672',
    },
  }),
);
