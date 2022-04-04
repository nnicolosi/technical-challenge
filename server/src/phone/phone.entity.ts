import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PhoneType } from './enums/phone-type.enum';
import { Contact } from 'src/contact/contact.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  phoneNumber: string;

  @Column()
  @IsEnum(PhoneType)
  phoneType: PhoneType;

  @ManyToOne(() => Contact, (contact) => contact.phoneNumbers, { onDelete: "CASCADE" })
  contact?: Contact;
}