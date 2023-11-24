import { Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  findByEmail(email: string) {
    return this.db.user.findFirst({ where: { email } })
  }
  create(email: string, salt: string, hash: string) {
    return this.db.user.create({ data: { email, salt, hash } })
  }
}
