import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { DbService } from './db/db.service';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

class HelloWorldDTO {
  @ApiProperty()
  message: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: DbService,
  ) {}

  @Get()
  @ApiOkResponse({
    type: HelloWorldDTO,
  })
  async getHello(): Promise<HelloWorldDTO> {
    const user = await this.dbService.user.findMany({
      where: {id: 40},
      include:{
        account: true,
        contact: true,
        social: true
      }
    });
    console.log('user:', user);
    return { message: this.appService.getHello() };
  }
}
// prisma.$disconnect();
