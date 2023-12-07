import { Injectable } from '@nestjs/common'
import { AccountService } from 'src/account/account.service'
import { DbService } from 'src/db/db.service'
import { UserDTO } from './user-dto'

@Injectable()
export class UsersService {
  constructor(
    private db: DbService,
    private accountService: AccountService
    ) {}

 async findByEmail(email: string) {
    return this.db.user.findFirst({ where: { email } })
  }
  async create(email: string, salt: string, hash: string, activationLink: string) {
    const newUser =  await this.db.user.create({ data: { email, salt, hash, activationLink } })
    return  new UserDTO(newUser)  
  }
}
