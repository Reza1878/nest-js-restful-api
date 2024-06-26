import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser() {
    await this.prismaService.user.deleteMany({ where: { username: 'test' } });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        name: 'test',
        password: await bcrypt.hash('test', 10),
        token: 'test',
      },
    });
  }

  async deleteContact() {
    await this.prismaService.contact.deleteMany({
      where: { username: 'test' },
    });
  }

  async createContact() {
    await this.prismaService.contact.create({
      data: {
        username: 'test',
        first_name: 'test',
        email: 'test@test.com',
        last_name: 'test',
        phone: '082212312312',
      },
    });
  }

  async getContact() {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        username: 'test',
      },
    });

    return contact;
  }
}
