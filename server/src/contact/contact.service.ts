import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CONTACT_REPOSITORY } from '../common/constants';

@Injectable()
export class ContactService {
  constructor(
    @Inject(CONTACT_REPOSITORY)
    private contactRepository: Repository<Contact>,
  ) { }

  // Using relations to target phoneNumbers array
  async findAll(): Promise<Contact[]> {
    let test = await this.contactRepository.find({
      relations: ['phoneNumbers']
    });
    return test
  }

  async findById(id: number): Promise<Contact | undefined> {
    return this.contactRepository.findOne({ where: { id: id } });
  }

  async create(contact: Contact): Promise<Contact> {
    const result = await this.contactRepository.insert(contact);
    const test = await this.contactRepository.findOne({
      where: { id: result?.identifiers[0].id },
    });
    console.log("createdContact")
    return test
  }
  // Delete
  async delete(id: number): Promise<boolean> {
    const result = await this.contactRepository.delete(id);
    return true
  }
  // Update
  async update(contact: Contact): Promise<Contact> {
    const result = await this.contactRepository.save(contact);
    return this.contactRepository.findOne({ where: { id: contact.id } });
  }
}
