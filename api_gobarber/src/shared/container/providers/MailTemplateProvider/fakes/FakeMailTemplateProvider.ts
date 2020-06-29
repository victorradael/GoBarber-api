import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTeamplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider
  implements IMailTeamplateProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
