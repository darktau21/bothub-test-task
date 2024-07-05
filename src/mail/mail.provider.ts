import type { Provider } from '@nestjs/common';

import { AppConfigService } from '@/config/config.service';
import { createTransport } from 'nodemailer';
import nodemailerMjmlPlugin from 'nodemailer-mjml';
import { join } from 'path';

export const MAIL_TRANSPORT = 'provider:mailTransport';

export const MailProvider: Provider = {
  inject: [AppConfigService],
  provide: MAIL_TRANSPORT,
  useFactory: (configService: AppConfigService) => {
    const transport = createTransport({
      auth: {
        pass: configService.get('SMTP_PASSWORD'),
        user: configService.get('SMTP_USER'),
      },
      debug: configService.get('NODE_ENV') === 'development',
      from: {
        address: configService.get('SMTP_FROM'),
        name: configService.get('SMTP_FROM_NAME'),
      },
      host: configService.get('SMTP_HOST'),
      port: configService.get('SMTP_PORT'),
      secure: configService.get('NODE_ENV') === 'production',
    });
    transport.use(
      'compile',
      nodemailerMjmlPlugin({ templateFolder: join(__dirname, 'templates') })
    );
    return transport;
  },
};
