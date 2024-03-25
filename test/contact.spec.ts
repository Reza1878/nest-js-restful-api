import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('ContactController (e2e)', () => {
  let app: INestApplication;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    testService = app.get(TestService);
  });

  describe('POST /api/contacts', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.createUser();
    });
    afterEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({ first_name: '', last_name: '', email: '', phone: '' });

      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to create if request is valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@mail.com',
          phone: '082121212',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.data.first_name).toBe('John');
      expect(response.body.data.last_name).toBe('Doe');
      expect(response.body.data.email).toBe('johndoe@mail.com');
      expect(response.body.data.phone).toBe('082121212');
    });

    it('should be rejected if requested with invalid token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contacts')
        .set('Authorization', 'wrong')
        .send();

      expect(response.statusCode).toBe(401);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
      await testService.createUser();
      await testService.createContact();
    });
    afterEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();
    });

    it('should be rejected if contact was not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/contact/0`)
        .set('Authorization', 'token');

      expect(response.statusCode).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if requested with invalid token', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact.id}`)
        .set('Authorization', 'wrong')
        .send();

      expect(response.statusCode).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to return contact if the contact was found', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact.id}`)
        .set('Authorization', 'test')
        .send();

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.first_name).toBe('test');
      expect(response.body.data.last_name).toBe('test');
      expect(response.body.data.email).toBe('test@test.com');
      expect(response.body.data.phone).toBe('082212312312');
    });
  });
});
