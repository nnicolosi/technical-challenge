import {
  Body,
  Controller,
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

@Controller('/contact')
export class ContactController {
  constructor(
    private readonly contactMapper: ContactMapper,
    private readonly contactService: ContactService,
  ) { }

  @Get()
  async findAll(): Promise<ContactDto[]> {
    const contacts = await this.contactService.findAll();
    return contacts.map((contact) => this.contactMapper.mapEntityToDto(contact));
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ContactDto> {
    const contact = await this.contactService.findById(id);
    return this.contactMapper.mapEntityToDto(contact);
  }

  @Post()
  async createContact(@Body() contactCreateDto: ContactCreateDto) {
    const contact = await this.contactMapper.mapCreateContactDtoToEntity(contactCreateDto);
    const response = await this.contactService.create(contact);
    return this.contactMapper.mapEntityToDto(response);
  }

  @Post('/delete')
  async deleteContact(@Body() contactDto: ContactDto) {
    const contact = await this.contactMapper.mapEntityToDto(contactDto);
    const response = await this.contactService.remove(contact);
  }

  @Put()
  async updateContact(@Body() contactDto: ContactDto) {
    const contact = await this.contactMapper.mapEntityToDto(contactDto);
    const response = await this.contactService.update(contact);
    return this.contactMapper.mapEntityToDto(response);
  }

}
