import { BadRequestException, Injectable, Param } from '@nestjs/common';
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

async deleteUser(userId: number,  sessionUserId: number){ 
   const candidate = await this.db.user.findFirst({
    where: { id: userId },
    });

    if (!candidate) {    
      throw new BadRequestException({ type: 'Нема такого юзера' });
    }

    if(userId !== sessionUserId){
      throw new BadRequestException({ type: 'Видалити можливо тільки себе' });
    }

    const transaction = await this.db.$transaction([      
      this.db.token.deleteMany({
        where: {
          userId: userId,
        },
      }),
      this.db.account.deleteMany({
        where: {
          userId: userId,
        },
      }),
      this.db.contact.deleteMany({
        where: {
          userId: userId,
        },
      }),
      this.db.social.deleteMany({
        where: {
          userId: userId,
        },
      }),
      this.db.user.delete({
        where: {
          id: userId,
        },
      }),
    ]);

    if (!transaction) {
      throw new BadRequestException({ type: 'Помилка при видаленні користувача' });
    }
    return transaction[4];  
 }
}
