import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma/prisma.service';
import { Logger } from 'winston';
import { User } from '@prisma/client';
import {
  ContactResponse,
  CreateContactRequest,
  UpdateContactRequest,
} from '../model/contact.model';
import { ValidationService } from '../common/validation/validation.service';
import { ContactValidation } from './contact.validation';

@Injectable()
export class ContactService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async create(
    user: User,
    request: CreateContactRequest,
  ): Promise<ContactResponse> {
    this.logger.info(
      `ContactService.create(${user.username}, ${JSON.stringify(request)})`,
    );

    const createRequest: CreateContactRequest = this.validationService.validate(
      ContactValidation.CREATE,
      request,
    );

    const contact = await this.prismaService.contact.create({
      data: {
        ...createRequest,
        username: user.username,
      },
    });

    return {
      first_name: contact.first_name,
      id: contact.id,
      email: contact.email,
      last_name: contact.last_name,
      phone: contact.phone,
    };
  }

  async getById(user: User, id: number): Promise<ContactResponse> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        username: user.username,
        id,
      },
    });

    if (!contact) throw new HttpException('Contact not found', 404);

    return {
      ...contact,
    };
  }

  async update(
    user: User,
    id: number,
    request: UpdateContactRequest,
  ): Promise<ContactResponse> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        username: user.username,
        id,
      },
    });

    if (!contact) throw new HttpException('Contact not found', 404);

    const updateRequest: UpdateContactRequest = this.validationService.validate(
      ContactValidation.UPDATE,
      request,
    );

    await this.prismaService.contact.update({
      where: { id },
      data: {
        ...updateRequest,
      },
    });

    return {
      id,
      ...updateRequest,
    };
  }
}
