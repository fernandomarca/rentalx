import { SES } from 'aws-sdk';
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;
  private region :string;

  constructor() {
    this.region = "sa-east-1";
    this.client = nodemailer.createTransport({
     SES: new SES({
       apiVersion:"2010-12-01",
       region:this.region
     })
   })
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

   await this.client.sendMail({
      to,
      from: "Rentx <contato@fmmagalhaes.com.br>",
      subject,
      html: templateHTML,
    });

  }
}

export { SESMailProvider };
