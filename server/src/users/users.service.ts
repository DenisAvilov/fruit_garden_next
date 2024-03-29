import { Injectable } from '@nestjs/common'
import { AccountService } from 'src/account/account.service'
import { DbService } from 'src/db/db.service'
import { UserDTO } from './user-dto'
import { AccountDto, ContactDto, SocialDto } from 'src/account/dto'
import { ContactService } from 'src/account/contact.service'
import { SocialService } from 'src/account/social.service'
import { Role } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(
    private db: DbService,
    private accountService: AccountService,
    private contactService: ContactService,
    private socialService: SocialService    
    ) {}

 async findByEmail(email: string) {
    return this.db.user.findFirst({ where: { email } })
  }
 async create(
    email: string, 
    salt: string, 
    hash: string,
    role: Role, 
    ):Promise<{    
      user: {
        activationLink: string       
        userId: number;    
        email: string;    
        isActivated: boolean;  
        role: Role;   
             
      },
      account: AccountDto,
      contact: ContactDto,
      social: SocialDto    
  }> {
   
    const User =  await this.db.user.create({data:{ email, salt, hash, role } })
    const account = await this.accountService.createAccount(User.id)
    const contact = await this.contactService.createContact(User.id)
    const social = await this.socialService.createSocial(User.id)

    const user = new UserDTO(User)  
   return {user, account, contact, social}
  }
 
 async count(){
 return await this.db.user.count()
 } 

}
