import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import { MailServiceInterface } from "./interfaces";
import * as Mail from "nodemailer/lib/mailer";

@Injectable()
export class NodeMailerService implements MailServiceInterface {
  private nodeMailer: Mail;
  private readonly logger = new Logger(NodeMailerService.name);

  constructor(private readonly configService: ConfigService) {
    this.nodeMailer = createTransport({
      host: configService.get("EMAIL_HOST"),
      port: configService.get("EMAIL_PORT"),
      auth: {
        user: configService.get("EMAIL_USER"),
        pass: configService.get("EMAIL_PASSWORD"),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async send(options: Mail.Options): Promise<void> {
    try {
      this.logger.log("Sending mail...");
      await this.nodeMailer.sendMail({
        ...options,
        from: this.configService.get("EMAIL_FROM"),
      });
      this.logger.log(
        `Mail sent to ${options.to}, subject: ${options.subject}`
      );
    } catch (error) {
      this.logger.error(`Could not send email to: ${options.to} `, error);
    }
  }
}
