export interface HtmlRenderService {
  render(templateFilename: string, params: Record<string, any>): Promise<string>;
}
