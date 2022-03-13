import { IsEnum, IsNotEmpty } from 'class-validator';
import { PhoneType } from 'src/phone/enums/phone-type.enum';

export class PhoneCreateDto {
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(PhoneType)
  phoneType: PhoneType;
}
