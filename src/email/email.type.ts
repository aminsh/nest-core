import { Type } from '@nestjs/common';
import { EmailService } from './service';

export interface SendEmailArguments {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export enum EmailProvider {
  Nodemailer = 'Nodemailer',
  Mock = 'Mock',
  Sendgrid = 'Sendgrid'
}

export interface EmailModuleOptions<T = {}> {
  provider: EmailProvider | Type<EmailService>;
  parameters?: T;
}

export interface NodemailerParameters {
  host: string;
  port: number;
  authentication: {
    username: string;
    password: string;
  },
  from: string;
}

export interface SendGridEmailParameters {
  apiKey: string;
}
