import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Phone } from 'src/phone/phone.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  emailAddress: string;

  @OneToMany(() => Phone, (phone) => phone.contact, { eager: true, cascade: ["insert", "update", "remove"] })
  phoneNumbers: Phone[];
}
