import { Test } from '@nestjs/testing';
import { JwtTokenGeneratorService, AuthModule, JWT_TOKEN_GENERATOR_SERVICE } from '../../auth';
import { UserSerializationService } from './user.serialization.service';

describe('Jwt Service', () => {
  let jwtTokenGeneratorService: JwtTokenGeneratorService;

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
        ]
      })
      .compile();

    jwtTokenGeneratorService = moduleRef.get<JwtTokenGeneratorService>(JWT_TOKEN_GENERATOR_SERVICE);
  });

  describe('Test generate method', () => {
    it('should return token based token instance', async () => {
      const token = await jwtTokenGeneratorService.generate({ id: 1, email: 'user@email.com' });
      expect(token).not.toBeNull();
      expect(token.token_type).toBe('Bearer');
      expect(token.expires_in).toBe('72h');
    });
  })
})
