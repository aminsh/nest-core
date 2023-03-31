import * as path from 'path';
import * as _ from 'lodash';
import mjml2html from 'mjml';
import { HtmlRenderService } from './html-render.service';
import { Inject } from '@nestjs/common';
import { EMAIL_MODULE_OPTIONS } from '../email.constants';
import { EmailModuleOptions } from '../email.type';
import { readFileAsync } from '../../utils';

export class MjmlHtmlRenderService implements HtmlRenderService {
  constructor(@Inject(EMAIL_MODULE_OPTIONS)
              private emailOptions: EmailModuleOptions<any>) {}

  async render(templateFilename: string, parameters: Record<string, any>): Promise<string> {
    const filename = templateFilename.replace('.mjml','');
    const fileFullPath = path.join(this.emailOptions.htmlTemplate.filePath, `${ filename }.mjml`);
    const content = await readFileAsync(fileFullPath)
    const template = _.template(content)(parameters);
    const { html } = mjml2html(template);
    return html;
  }
}
