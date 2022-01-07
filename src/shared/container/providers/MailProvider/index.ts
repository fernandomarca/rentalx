import { container } from "tsyringe";
import { IMailProvider } from "../MailProvider/IMailProvider";
import { EtherealMailProvider } from "../MailProvider/implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
  ethereal:container.resolve(EtherealMailProvider),
  ses:container.resolve(SESMailProvider),
}

const mail = process.env.MAIL_PROVIDER === "ses" ? "ses" : "ethereal";

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider["ses"]
);