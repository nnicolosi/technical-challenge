import { PhoneType } from 'src/phone/enums/phone-type.enum';

export class PhoneDto {
  id: number;
  phoneNumber: string;
  phoneType: PhoneType;
}
