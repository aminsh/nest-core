import { DynamicModule, Module } from '@nestjs/common';
import { resolveEmailServiceImp, resolveHtmlRenderServiceImp, resolveOptionsProvider } from './email.providers';
import { EmailModuleOptions } from './email.type';
import { EMAIL_SERVICE, HTML_RENDER_SERVICE } from './email.constants';

@Module({
  providers: [],
  exports: [
    EMAIL_SERVICE,
    HTML_RENDER_SERVICE
  ]
})
export class EmailModule {
  static register<TParameters>(options: EmailModuleOptions): DynamicModule {
    return {
      module: EmailModule,
      providers: [
        resolveOptionsProvider(options),
        resolveEmailServiceImp(options),
        resolveHtmlRenderServiceImp(options)
      ]
        .filter(e => e)
    }
  }
}
