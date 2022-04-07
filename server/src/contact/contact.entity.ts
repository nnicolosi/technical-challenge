import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArrayUnique, IsEmail, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Phone } from 'src/phone/phone.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsEmail()
  emailAddress: string;

  @OneToMany(() => Phone, (phone) => phone.contact, { eager: true, cascade: ["insert", "update", "remove"] })
  @ValidateNested()
  @ArrayUnique(phoneNumber => phoneNumber.phoneType)
  phoneNumbers: Phone[];
}
