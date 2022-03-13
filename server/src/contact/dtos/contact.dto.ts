import { PhoneDto } from 'src/phone/dtos/phone.dto';

export class ContactDto {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumbers: PhoneDto[];
}
