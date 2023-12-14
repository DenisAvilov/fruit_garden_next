import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbModule } from 'src/db/db.module';
import { AccountModule } from 'src/account/account.module';
import { AccountService } from 'src/account/account.service';
import { ContactService } from 'src/account/contact.service';
import { SocialService } from 'src/account/social.service';

@Module({
  imports: [DbModule, AccountModule],
  providers: [UsersService,  AccountService, ContactService, SocialService],
  exports: [UsersService]
})
export class UsersModule {}
