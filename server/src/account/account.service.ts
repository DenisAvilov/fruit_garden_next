import {  Injectable } from '@nestjs/common';
import { AccountDto, PatchAccountDto } from './dto';
import { DbService } from 'src/db/db.service';




@Injectable()
export class AccountService {
  constructor(private db: DbService){}

async createAccount(userId: number){
  return await this.db.account.create({data: {userId}})
}  

async getAccount(userId: number):Promise<AccountDto>{
  return await this.db.account.findFirstOrThrow({where: {userId}})

 }
 
async patchAccount(userId: number, body: PatchAccountDto):Promise<AccountDto>{
  const account = await this.db.account.update({where: {userId}, data: {...body}} )
  return account
 }

}
