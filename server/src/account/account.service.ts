import { BadRequestException, Injectable, } from '@nestjs/common';
import { AccountAndRoleDto, AccountDto, PatchAccountDto, UserDto} from './dto';
import { DbService } from 'src/db/db.service';
import { Role } from '@prisma/client';




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

async getAccount(sessionRoles: string, userId: number ):Promise<AccountDto[]>{
try {
    let account;
    if (sessionRoles === 'ADMIN') {
      account = await this.db.user.findMany({
        include: {
          account: true
        }
      })
      
      
    } else if (sessionRoles === 'USER') {
      account = await this.db.account.findMany({
        where: { id: userId },      
      });
    } else {
      throw new BadRequestException({ type: 'Отримати данні можливо тільки свої' });
    }
    return account;
  } catch(error) {
    throw new BadRequestException({ type: 'Отримати данні можливо тільки свої' });
  }
 }
 
async getAccountInfo(id: number, sessionRoles: string, userId: number): Promise<UserDto[]>{   
    try {
    let account;
    if (sessionRoles === 'ADMIN') {
      account = await this.db.user.findMany({ 
        where: { id: id },        
        include: {
          account: true
        }       
      });
    } else if (sessionRoles === 'USER' && id === userId) {
      account = await this.db.user.findFirstOrThrow({
        where: { id: id },
         include: {
          account: true
        }       
      });
    } else {
      throw new BadRequestException({ type: 'Отримати данні можливо тільки свої' });
    }
    return account;
  } catch(error) {
    throw new BadRequestException({ type: 'Отримати данні можливо тільки свої' });
  }
 }
 
async patchAccountAdmin(  
  sessionId: number,
  body: PatchAccountDto,
  sessionRoles: string,  
  ):Promise<AccountAndRoleDto>{
  
 try{
  let account 
    if (sessionRoles === 'ADMIN') {    
      const { name, lastName, img } = body;      
         await this.db.account.update({
          where: { userId: sessionId },
          data: {
            name: name,
            lastName: lastName,
            img: img
          }
        });
         account = { ...account, ...{ account: body } };            
      }    
    return account;
 }
 catch(error){
  return error
 }
 }

async patchAccount(
  userId: number,
  sessionId: number,
  body: PatchAccountDto,
  sessionRoles: string,
  role: Role,
  ):Promise<AccountAndRoleDto>{
  
 try{
  let account 
    if (sessionRoles === 'ADMIN') {    
       account = await this.db.user.findFirst({
          where: { id: userId },
          include: {
            account: true
          }
        });
      if (!account) {
        throw new BadRequestException({ type: 'Нема такого користувача.' });
      }
      if(userId === sessionId){
         throw new BadRequestException({ type: 'Неможна міняти ролі самому собі.' });
      }
      if (role) {
       account =  await this.db.user.update({
          where: { id: userId },
          data: {
            role: role
          }
        });          
          account = { ...account };        
      }
    }
    if (sessionRoles === 'USER') {
      account = await this.db.user.findFirst({
          where: { id: sessionId },
          include: {
            account: true
          }
        });
      if (!account) {
        throw new BadRequestException({ type: 'Нема такого користувача.' });
      }     
      if (body) {
         const { name, lastName, img } = body;      
         await this.db.account.update({
          where: { userId: sessionId },
          data: {
            name: name,
            lastName: lastName,
            img: img
          }
        });
         account = { ...account, ...{ account: body } };
      }
    }   
    return account;
 }
 catch(error){
  return error
 }
 }

async deleteUser(userId: number, sessionRoles: string, sessionUserId: number){ 
   
    try{
      const candidate = await this.db.user.findFirst({
      where: { id: userId },
    });

    if (!candidate) {    
      throw new BadRequestException({ type: 'Нема такого юзера' });
    }
    if (sessionRoles === 'ADMIN' && userId === sessionUserId){        
        throw new BadRequestException({ type: 'Адміністратору заборонено видаляти свій власний акаунт' });     
    } 
    if (sessionRoles === 'USER' && userId !== sessionUserId) {      
      throw new BadRequestException({ type: 'Видалити можливо тільки себе' });          
    }
  
    // Удаление связанных данных пользователя
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
      // Удаление самого пользователя
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
    catch(error){
      return error
    }
  
} 

}
