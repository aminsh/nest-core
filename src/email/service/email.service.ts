import { SendEmailArguments } from '../email.type';

export interface EmailService {
  send(arg: SendEmailArguments): Promise<void>;
}
