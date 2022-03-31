import { Injectable } from '@nestjs/common';
import { PhoneDto } from './dtos/phone.dto';
import { Phone } from './phone.entity';
import { PhoneCreateDto } from './dtos/phone-create.dto';

@Injectable()
export class PhoneMapper {
  mapEntityToDto(phone: Phone): PhoneDto {
    return {
      id: phone.id,
      phoneNumber: phone.phoneNumber,
      phoneType: phone.phoneType,
    };
  }

  mapCreatePhoneDtoToEntity(dto: PhoneCreateDto): Phone {
    let test = {
      id: 0,
      phoneNumber: dto.phoneNumber,
      phoneType: dto.phoneType,
    };
    console.log(test)
    return test
  }
}
