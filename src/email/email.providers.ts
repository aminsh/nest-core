import { EmailModuleOptions, EmailProvider } from './email.type';
import { EMAIL_MODULE_OPTIONS, EMAIL_SERVICE } from './email.constants';
import { Provider } from '@nestjs/common';
import { MockEmailService, NodemailerEmailService } from './service';

export const resolveOptionsProvider = (options: EmailModuleOptions): Provider => (
  {
    provide: EMAIL_MODULE_OPTIONS,
    useValue: options
  }
);

const emailServiceMapper = {
  [EmailProvider.Nodemailer]: NodemailerEmailService,
  [EmailProvider.Mock]: MockEmailService
}
export const resolveEmailServiceImplementation = (options: EmailModuleOptions): Provider => {
  if (typeof options.provider === 'string' && Object.values(EmailProvider).includes(options.provider))
    return {
      provide: EMAIL_SERVICE,
      useClass: emailServiceMapper[options.provider]
    }


  if (typeof options.provider === 'function')
    return {
      provide: EMAIL_SERVICE,
      useClass: options.provider
    };
}
