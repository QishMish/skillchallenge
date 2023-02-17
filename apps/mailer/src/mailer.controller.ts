import { MailOptionsDto } from "./dtos/mail-options.dto";
import { MailServiceInterface, MAIL_SERVICE } from "@app/mail";
import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { JwtAuthGuard } from "@app/auth-rpc";

@Controller("/")
@UseGuards(JwtAuthGuard)
export class MailerController {
  constructor(
    @Inject(MAIL_SERVICE) private readonly mailerService: MailServiceInterface
  ) {}

  @Post("send-email")
  public sendMail(@Body() body: MailOptionsDto): Promise<void> {
    return this.mailerService.send(body);
  }

  @EventPattern("send_email")
  public sendMailListener(@Payload() data): Promise<void> {
    return this.mailerService.send(data);
  }
}
