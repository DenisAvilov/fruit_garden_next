import { Injectable } from '@nestjs/common'
import { AccountService } from 'src/account/account.service'
import { DbService } from 'src/db/db.service'
import { UserDTO } from './user-dto'
import { ContactService } from 'src/contact/contact.service'
import { SocialService } from 'src/social/social.service'
import { AccountDto, ContactDto, SocialDto } from 'src/account/dto'

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
  async create(email: string, salt: string, hash: string, activationLink: string):Promise<{    
      user: {userId: number;    email: string;    isActivated: boolean;  role: string;},
      account: AccountDto,
      contact: ContactDto,
      social: SocialDto    
  }> {
    const User =  await this.db.user.create({ data: { email, salt, hash, activationLink } })

    const account = await this.accountService.createAccount(User.id)
    const contact = await this.contactService.createContact(User.id)
    const social = await this.socialService.createSocial(User.id)

     const user = new UserDTO(User)  
   return {user, account, contact, social}
  }
}
