import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule, JWT_TOKEN_GENERATOR_SERVICE, JWTAccessToken, JwtTokenGeneratorService } from '../../auth';
import { UserSerializationService } from './user.serialization.service';
import { HttpJwtGuardTestController } from './httpJwtGuardTestController';

describe('Http Guard test', () => {
  let app: INestApplication;
  let token: JWTAccessToken;
  const user = { id: 1, email: 'user@email.com' };

  beforeEach(async () => {
    const moduleRef = await Test
      .createTestingModule({
        imports: [
          AuthModule.register({
            jwt: {
              secret: 'P@ssw0rd',
              expiresIn: '72h'
            },
            userSerializationService: UserSerializationService
          })
        ],
        providers: [],
        controllers: [
          HttpJwtGuardTestController
        ]
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const jwtTokenGeneratorService = moduleRef.get<JwtTokenGeneratorService>(JWT_TOKEN_GENERATOR_SERVICE);
    token = await jwtTokenGeneratorService.generate(user)
  });

  describe('Test ', () => {
    it('should be Unauthorized 401 exception', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(401);
    });

    it('should be Successful 200', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `${ token.token_type } ${ token.access_token }`)

     expect(response.body.email).toBe(user.email);
    });
  })

  afterAll(async () => {
    await app.close();
  })
})
