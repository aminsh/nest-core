import request from 'supertest';
import { Test } from '@nestjs/testing';
import { GoogleTestController } from './googleTestController';
import { AuthModule } from '../../auth';
import { UserSerializationService } from './user.serialization.service';
import { INestApplication } from '@nestjs/common';
import { GoogleTestAuthManagerService } from './googleAuthManagerService';

describe('Google test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [
        GoogleTestController
      ],
      imports: [
        AuthModule.register({
          jwt: {
            secret: 'P@ssw0rd',
            expiresIn: '72h'
          },
          userSerializationService: UserSerializationService,
          google: {
            clientID: '796524659879-vs4u51tbc11li58fp392kiaekqhr0aid.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:9090/v1/auth/google/redirect',
            scope: [ 'email', 'profile' ],
            authManagerService: GoogleTestAuthManagerService
          }
        })
      ]
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  })

  describe('Test Auth', () => {
    it('should return Authentication URL', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/google');

      expect(response.redirect).toBeTruthy();
      expect(response.header.location.toString().includes('google')).toBeTruthy();
    });

    it('should return user', async () => {
      const url = 'auth/google/redirect?code=4/0AVHEtk7p7b6sOvXquasjihJyyTPZ8sIXGUixN-zEfOkhu8qOwCx91s6Y4sFgx82pxGUQVQ&scope=email+profile+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid&authuser=0&hd=felixin.io&prompt=consent'
      return request(app.getHttpServer())
        .get(url)
    });
  })
})
