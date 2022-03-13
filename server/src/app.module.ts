import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { ContactController } from './contact/contact.controller';
import { PhoneModule } from './phone/phone.module';

@Module({
  imports: [DatabaseModule, ContactModule, PhoneModule],
  controllers: [AppController, ContactController],
  providers: [AppService],
})
export class AppModule {
  constructor() { }
}
