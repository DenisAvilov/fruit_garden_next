import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { DbModule } from 'src/db/db.module';
import { CookieService } from 'src/auth/cookie.service';
import { ContactService } from './contact.service';
import { SocialService } from './social.service';






@Module({
  imports: [DbModule],
  controllers: [AccountController],
  providers: [AccountService, CookieService, ContactService, SocialService],
  exports: [AccountService]
})
export class AccountModule {}


