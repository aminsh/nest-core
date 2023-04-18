import { DynamicModule, Module } from '@nestjs/common';
import { FileOptions } from './file.type';
import { multerRegister } from './multer/multer.register';

@Module({})
export class FileModule {
  register(options: FileOptions): DynamicModule {
   const multerRegisterModule: Partial<DynamicModule> = options.multer
     ? multerRegister(options.multer)
     : {};

    return {
      module: FileModule,
      imports: [
        ...multerRegisterModule.imports
      ]
    }
  }
}
