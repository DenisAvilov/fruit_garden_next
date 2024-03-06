import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetSessionInfoDto } from 'src/auth/dto';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/pablic.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { BasketDto, } from './basketDto';
import { PostBasketDto } from './PostBasketDto';

@ApiTags('basket')
@Controller('basket')
@UseGuards(AuthGuard) 
export class BasketController {
  constructor(
    private basketService: BasketService,    
  ){}
  
  @Get()
  @Public()
  @Roles('ADMIN','USER')
  @ApiResponse({description: 'отримання карзини', type: BasketDto})
  async getBasket( @SessionInfo() session: GetSessionInfoDto){
    let id
    if(session){
       id = session.userId
    }else{
      id = 0
    }    
     const basket = await this.basketService.getBasket(id)
     return basket
  }

  @Post()
  @Public()  
  @Roles('ADMIN','USER')  
  @ApiCreatedResponse({ description: 'Кошик, створений успішно', type: BasketDto })
  async createBasket(
    @Body() body: PostBasketDto,   
    @SessionInfo() session: GetSessionInfoDto
    ){     
      let id
      if(session){
       id = session.userId? session.userId : undefined 
      }    
    const basket = await this.basketService.addBasket(id, body)
    return basket;
  }
}
