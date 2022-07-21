import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ContactCreateDto } from './dtos/contact-create.dto';
import { ContactDto } from './dtos/contact.dto';
import { ContactMapper } from './contact.mapper';
import { ContactService } from './contact.service';
import { ContactUpdateDto } from './dtos/contact-update.dto';

@Controller('/contact')
export class ContactController {
  constructor(
    private readonly contactMapper: ContactMapper,
    private readonly contactService: ContactService,
  ) {}

  @Get()
  async findAll(): Promise<ContactDto[]> {
    const contacts = await this.contactService.findAll();
    return contacts.map((contact) =>
      this.contactMapper.mapEntityToDto(contact),
    );
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ContactDto> {
    const contact = await this.contactService.findById(id);
    return this.contactMapper.mapEntityToDto(contact);
  }

  @Post()
  async createContact(@Body() contactCreateDto: ContactCreateDto) {
    const contact = await this.contactMapper.mapCreateContactDtoToEntity(
      contactCreateDto,
    );
    const response = await this.contactService.create(contact);
    return this.contactMapper.mapEntityToDto(response);
  }

  @Put(':id')
  async updateContact(
    @Param('id') id: number,
    @Body() contactUpdateDto: ContactUpdateDto,
  ) {
    const contact = await this.contactMapper.mapUpdateContactDtoToEntity(
      contactUpdateDto,
    );
    const response = await this.contactService.update(contact);
    return this.contactMapper.mapEntityToDto(response);
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: number) {
    const response = await this.contactService.remove(id);
    console.info({ response });
    const contacts = await this.contactService.findAll();
    return contacts.map((contact) =>
      this.contactMapper.mapEntityToDto(contact),
    );
  }
}
