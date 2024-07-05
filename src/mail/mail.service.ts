import type { Transporter } from 'nodemailer';

import { AppConfigService } from '@/config/config.service';
import { Inject, Injectable } from '@nestjs/common';

import { MAIL_TRANSPORT } from './mail.provider';

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_TRANSPORT) private readonly mailTransport: Transporter,
    private readonly configService: AppConfigService
  ) {}

  sendVerificationEmail(to: string, verificationCode: string) {
    this.mailTransport.sendMail({
      subject: 'Email verification',
      templateData: {
        verificationCode,
        verificationLink: this.configService.get('VERIFY_LINK'),
      },
      templateName: 'email-verification',
      to,
    });
  }
}
