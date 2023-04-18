import { MulterOptions } from './multer.type';
import { DynamicModule } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

export const multerRegister = (options: MulterOptions): Partial<DynamicModule> => {
  return {
    imports: [
      MulterModule.register({
        dest: options.destination
      })
    ]
  }
}
