import { EmailService } from './email.service';
import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_MODULE_OPTIONS } from '../email.constants';
import * as mail from '@sendgrid/mail';
import { EmailModuleOptions, SendEmailArguments, SendGridEmailParameters } from '../email.type';

@Injectable()
export class SendgridEmailService implements EmailService {
  constructor(@Inject(EMAIL_MODULE_OPTIONS)
              private emailOptions: EmailModuleOptions<SendGridEmailParameters>) {
    mail.setApiKey(emailOptions.parameters.apiKey);
  }

  async send(args: SendEmailArguments): Promise<void> {
    await mail.send({
      from: this.emailOptions.emailFrom,
      to: args.to,
      subject: args.subject,
      html: args.html
    });
  }
}
