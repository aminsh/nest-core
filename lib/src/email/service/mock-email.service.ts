import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_MODULE_OPTIONS } from '../email.constants';
import { EmailModuleOptions, SendEmailArguments } from '../email.type';
import { EmailService } from './email.service';

@Injectable()
export class MockEmailService implements EmailService {
  constructor(@Inject(EMAIL_MODULE_OPTIONS)
              private emailOptions: EmailModuleOptions) {}

  async send(arg: SendEmailArguments): Promise<void> {
    console.log('To: ', arg.to);
    console.log('Subject: ', arg.subject);
  }
}
