import { Type } from '@nestjs/common';
import { EmailService } from './service';
import { HtmlRenderService } from './service/html-render.service';

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
  emailFrom: string;
  htmlTemplate: {
    filePath: string;
    renderProvider?: Type<HtmlRenderService>
  }
}

export interface NodemailerParameters {
  host: string;
  port: number;
  authentication: {
    username: string;
    password: string;
  }
}

export interface SendGridEmailParameters {
  apiKey: string;
}
