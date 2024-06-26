import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import {
  ContactResponse,
  CreateContactRequest,
  UpdateContactRequest,
} from '../model/contact.model';
import { WebResponse } from '../model/web.model';
import { Auth } from '../common/auth/auth.decorator';
import { User } from '@prisma/client';

@Controller('/api/contacts')
export class ContactController {
  constructor(private service: ContactService) {}

  @Post()
  async create(
    @Auth() user: User,
    @Body() request: CreateContactRequest,
  ): Promise<WebResponse<ContactResponse>> {
    const res = await this.service.create(user, request);

    return {
      data: res,
    };
  }

  @Get('/:contactId')
  async get(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) id: number,
  ): Promise<WebResponse<ContactResponse>> {
    const res = await this.service.getById(user, id);

    return {
      data: res,
    };
  }

  @Put('/:contactId')
  async update(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) id: number,

    @Body() request: UpdateContactRequest,
  ): Promise<WebResponse<ContactResponse>> {
    const res = await this.service.update(user, id, request);

    return {
      data: res,
    };
  }
}
