import { Module } from '@nestjs/common';

import { MailProvider } from './mail.provider';
import { MailService } from './mail.service';

@Module({
  exports: [MailService],
  providers: [MailProvider, MailService],
})
export class MailModule {}
