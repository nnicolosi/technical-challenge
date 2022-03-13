import { Contact } from './contact.entity';
import { Connection } from 'typeorm';
import { DATABASE_CONNECTION, CONTACT_REPOSITORY } from '../common/constants';

export const contactProviders = [
  {
    provide: CONTACT_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Contact),
    inject: [DATABASE_CONNECTION],
  },
];
