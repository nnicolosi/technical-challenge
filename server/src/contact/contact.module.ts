import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactMapper } from './contact.mapper';
import { contactProviders } from './contact.providers';
import { ContactService } from './contact.service';
import { PhoneModule } from 'src/phone/phone.module';

@Module({
  imports: [DatabaseModule, PhoneModule],
  providers: [...contactProviders, ContactController, ContactMapper, ContactService],
  exports: [ContactController, ContactMapper, ContactService],
})
export class ContactModule { }
