import { EmailService } from './email.service';
import { EmailModuleOptions, NodemailerParameters, SendEmailArguments } from '../email.type';
import { createTransport } from 'nodemailer';
import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_MODULE_OPTIONS } from '../email.constants';

@Injectable()
export class NodemailerEmailService implements EmailService {
  constructor(@Inject(EMAIL_MODULE_OPTIONS)
              private emailOptions: EmailModuleOptions<NodemailerParameters>) {}

  async send(arg: SendEmailArguments): Promise<void> {
    const { parameters } = this.emailOptions;

    const transporter = createTransport({
      host: parameters.host,
      port: Number(parameters.port),
      secure: false,
      auth: {
        user: parameters.authentication.username,
        pass: parameters.authentication.password
      }
    });

    await transporter.sendMail({ ...arg, from: parameters.from });
  }
}
