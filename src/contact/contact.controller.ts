import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactResponse, CreateContactRequest } from '../model/contact.model';
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
}
