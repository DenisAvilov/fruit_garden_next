import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './db/db.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { AccountModule } from './account/account.module';
import { ContactModule } from './contact/contact.module';
import { SocialModule } from './social/social.module';


@Module({
  imports: [AuthModule, UsersModule, DbModule, AccountModule, ContactModule, SocialModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
