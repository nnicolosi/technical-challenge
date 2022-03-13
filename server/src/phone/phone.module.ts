import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { PhoneMapper } from './phone.mapper';

@Module({
  imports: [DatabaseModule],
  providers: [PhoneMapper],
  exports: [PhoneMapper],
})
export class PhoneModule { }
