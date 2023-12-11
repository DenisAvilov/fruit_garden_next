import {  Injectable, Param } from '@nestjs/common';
import { AccountDto, PatchAccountDto, ProfileDto } from './dto';
import { DbService } from 'src/db/db.service';




@Injectable()
export class AccountService {
  constructor(private db: DbService){}

async createAccount(userId: number){
  return await this.db.account.create({data: {
    userId: userId,
    name: 'Ім\'я',
    lastName: 'Призвище'
  }})
}  

async getAccount(userId: number):Promise<AccountDto>{
  return await this.db.account.findFirstOrThrow({
    where: {userId}
  })
 }
 
async getAccountInfo(@Param('id') id: number ): Promise<ProfileDto>{   
  return await this.db.user.findFirstOrThrow({
    where: {id: id},
    include:{      
      account: true,
      contact: true,
      social: true
    }})
 }
 
async patchAccount(userId: number, body: PatchAccountDto):Promise<AccountDto>{
  const account = await this.db.account.update({where: {userId}, data: {...body}} )
  return account
 }

}
