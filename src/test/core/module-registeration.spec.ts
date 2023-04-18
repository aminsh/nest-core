import { SampleModule, SampleService } from './sample.module';
import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('Module Registration Test', () => {
  it('should work by sync', async () => {
    const options = {
      name: 'SAMPLE-NAME',
      secret: '123456'
    };

    const moduleRef = await Test.createTestingModule({
      imports: [
        SampleModule.register(options)
      ]
    })
      .compile();

    const sampleService = moduleRef.get(SampleService);

    expect(sampleService.options.name).toBe(options.name);
    expect(sampleService.options.secret).toBe(options.secret);
  });

  it('should work by Async', async () => {
    const options = {
      SAMPLE_NAME: 'SAMPLE-NAME-CONFIG',
      SAMPLE_SECRET: 'P@ssword'
    };
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            () => options
          ]
        }),
        SampleModule.registerAsync({
          useFactory: (configService: ConfigService) => ({
            name: configService.get('SAMPLE_NAME'),
            secret: configService.get('SAMPLE_SECRET')
          }),
          inject: [ ConfigService ]
        })
      ]
    })
      .compile();

    const sampleService = moduleRef.get(SampleService);

    expect(sampleService.options.name).toBe(options.SAMPLE_NAME);
    expect(sampleService.options.secret).toBe(options.SAMPLE_SECRET);
  });
})
