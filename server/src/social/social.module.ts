import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { DbModule } from 'src/db/db.module';
import { CookieService } from 'src/auth/cookie.service';

@Module({
  imports: [DbModule],
  providers: [SocialService, CookieService],
  exports: [SocialService]
})
export class SocialModule {}
