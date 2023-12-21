import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { DbModule } from 'src/db/db.module';
import { CookieService } from 'src/auth/cookie.service';
import { ContactService } from './contact.service';
import { SocialService } from './social.service';
import { MobizonService } from './mobizon.service';

@Module({
  imports: [DbModule],
  controllers: [AccountController],
  providers: [AccountService, CookieService, ContactService, SocialService, MobizonService],
  exports: [AccountService, MobizonService] 
})
export class AccountModule {}


