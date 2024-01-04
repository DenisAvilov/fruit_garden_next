import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { DbService } from './db/db.service';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// class HelloWorldDTO {
//   @ApiProperty()
//   message: string;
// }

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: DbService,
  ) {}

  @Get()
  @ApiOkResponse()
  async getHello() {
    const user = await this.dbService.user.findMany({      
      include:{
        account: true,
        contact: true,
        social: true
      }
    });    
    return user
  }
}
// prisma.$disconnect();
