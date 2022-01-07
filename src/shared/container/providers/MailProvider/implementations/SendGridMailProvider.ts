import { IMailProvider } from "../IMailProvider";
import fs from 'fs';
import handlebars from  'handlebars';
export class SendGridMailProvider implements IMailProvider {
  constructor() {
    //sendGridMail.setApiKey(String(process.env.SENDGRID_API_KEY));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    // await sendGridMail.send({
    //   to,
    //   from: 'Rentx <noreplay@rentx.com.br>',
    //   subject,
    //   html: templateHTML,
    // });
  }
}