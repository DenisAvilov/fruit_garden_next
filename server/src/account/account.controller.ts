import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AccountDto, PatchAccountDto} from './dto';
// import { Response } from 'express'
import { CookieService } from 'src/auth/cookie.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';

@Controller('account')
@UseGuards(AuthGuard) //Проверяет состояние сессии и возвращяет Токен
export class AccountController {
  constructor(
    private accountService: AccountService,
    private cookieService: CookieService){}
  @Get()
  @ApiOkResponse({
    type: AccountDto
  })
 async getAccount(@SessionInfo() session: GetSessionInfoDto):Promise<AccountDto>{
   return await this.accountService.getAccount(session.userId)  
  }

 

  @Patch() //Метод для обновлення інформації
  @ApiOkResponse({
    type: AccountDto
  })
  async patchAccount(
    @Body() body: PatchAccountDto, 
    @SessionInfo() session: GetSessionInfoDto
    ):Promise<AccountDto>{
      const account = await this.accountService.patchAccount(
        session.userId,
        body
        )
        return account
    }
}
