import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from '../common/constants';
import {
  dbHostname,
  dbName,
  dbPassword,
  dbPort,
  dbUsername,
} from '../config/secrets';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: dbHostname,
        port: dbPort,
        database: dbName,
        username: dbUsername,
        password: dbPassword,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
