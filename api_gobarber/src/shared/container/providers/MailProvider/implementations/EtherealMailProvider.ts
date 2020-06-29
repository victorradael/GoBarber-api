import IMailProvider from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }
  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe DevMonster <equipe@devmonster.com>',
      to,
      subject: 'Recuperação de Senha',
      text: body,
    });
    console.log(message.messageId);
    console.log(nodemailer.getTestMessageUrl(message));
  }
}
