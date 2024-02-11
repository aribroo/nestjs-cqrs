import { registerAs } from '@nestjs/config';
import { getBoolean } from 'src/common/utilities/common.utility';

export default registerAs(
  'swagger',
  (): Record<string, any> => ({
    config: {
      info: {
        title: 'User Aggregation API',
        setDescription: 'Service user',
        setVersion: '1.0',
        setTermsOfService: 'https://example.com/terms',
        setContact: `'John Doe', 'john@example.com', 'https://example.com/contact'`,
        setLicense: `'MIT', 'https://example.com/license'`,
      },
      swaggerUI: getBoolean(process.env.SWAGGER_ENABLED) || true,
      documentationPath: process.env.DOCUMENTATION_PATH,
    },
    options: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    localUrl: process.env.SWAGGER_LOCAL_SERVER ?? 'http://localhost:3000',
    develompentUrl:
      process.env.SWAGGER_DEVELOPMENT_SERVER ?? 'https://example.com',
    productionUrl:
      process.env.SWAGGER_PRODUCTION_SERVER ?? 'https://example.com',
  }),
);
