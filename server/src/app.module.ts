import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './db/db.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { AccountModule } from './account/account.module';



@Module({
  imports: [AuthModule, UsersModule, DbModule, AccountModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
