import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch,  Query,  Res,  UseGuards } from '@nestjs/common'
import { AccountService } from './account.service'
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { AccountAndRoleDto, AccountDto,     ContactDtoSW,  ContactDtoSWActivate,  PatchAccountDto,  PatchSocialDto,  SocialDto, UserDto} from './dto'
import { CookieService } from 'src/auth/cookie.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { SessionInfo } from 'src/auth/session-info.decorator'
import { GetSessionInfoDto } from 'src/auth/dto'
import { Response } from 'express'
import { ContactService } from './contact.service'
import { SocialService } from './social.service'
import { Roles } from 'src/auth/roles.decorator'
import { Role } from '@prisma/client'


@ApiTags('account')
@Controller('account')
@UseGuards(AuthGuard) 
export class AccountController {
  constructor(
    private accountService: AccountService,
    private cookieService: CookieService,
    private contactService: ContactService,
    private socialService: SocialService
    ){}

  @Get()
  @Roles('ADMIN','USER') 
  @ApiOkResponse({
    type: AccountDto
  })
  
 getAccount(@SessionInfo() session: GetSessionInfoDto):Promise<AccountDto[]>{
   return  this.accountService.getAccount(session.role, session.userId)  
  }

 
//GET CONTACT BY ID  endPoint
  @Get(':id') 
  @Roles('ADMIN', 'USER')   
  @ApiParam({ name: 'id', required: true, description: 'ID of the user', example: 44 })
  @ApiOkResponse({
    type:  UserDto
  })
  async getAccountInfo(
    @SessionInfo() session: GetSessionInfoDto,      
    @Param('id') id: string    
  ):Promise<UserDto[]>{     
    return await this.accountService.getAccountInfo(parseInt(id, 10), session.role, session.userId)
  }

  @Patch() 
  @Roles('ADMIN') 
  @ApiOkResponse({
    type: AccountDto
  })  
  async patchAccountAdmin(
    @Body() body: PatchAccountDto,   
    @SessionInfo() session: GetSessionInfoDto
    ):Promise<AccountAndRoleDto>{      
       return await this.accountService.patchAccountAdmin(
        session.userId,
        body,
        session.role,        
        )
         
    }
  
 @Patch(':id')
@Roles('ADMIN', 'USER')
@ApiParam({ name: 'id', description: 'ID of the user', example: 1 })
@ApiQuery({ name: 'role', description: 'Define the new role of the user', example: 'ADMIN', required: false })  
@ApiOkResponse({
  type: AccountDto
})
async patchAccount(
  @Body() body: PatchAccountDto,
  @Param('id', ParseIntPipe) id: number,
  @SessionInfo() session: GetSessionInfoDto,
  @Query('role') role?: Role, 
): Promise<AccountAndRoleDto> {
  return await this.accountService.patchAccount(
    id,
    session.userId,
    body,
    role ?? session.role,
    session.role,
  );
}


  @Delete(':id')  
  @Roles('ADMIN', 'USER') 
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, description: 'ID of the user', example: 1 })  
  @ApiOkResponse() 
  async deleteUser(       
    @Param('id', ParseIntPipe) id: number, 
    @Res({passthrough: true}) res: Response, 
    @SessionInfo() session: GetSessionInfoDto  
  ){            
   try {
    const userDelete = await this.accountService.deleteUser(id, session.role, session.userId);
    if (!(userDelete instanceof BadRequestException)  && session.role === 'USER') {     
    this.cookieService.removeToken(res);
  }
  return userDelete;   
  } catch (error) {  
    return error; 
  }
  }

//UPDATE PHONE CONTACT endPoint

 @Patch('patch-contact') 
 @Roles('ADMIN', 'USER') 
 @ApiOkResponse({
    type: ContactDtoSW
  })
 async patchContact(
    @Body() body: ContactDtoSW, 
    @SessionInfo() session: GetSessionInfoDto
    ):Promise<{isActivated: boolean}>{
       return await this.contactService.patchContact(
        session.userId,
        body
        )    
    }


  //ACTIVATION EMAIL CONTACT endPoint
 @Patch('patch-contact-activate') 
 @Roles('ADMIN', 'USER') 
 @ApiOkResponse({
    type: ContactDtoSWActivate
  })
 async patchVerifyPhone(
    @Body() body: ContactDtoSWActivate, 
    @SessionInfo() session: GetSessionInfoDto
    ):Promise<{isActivated: boolean}>{
      return await this.contactService.patchVerifyPhone(
        session.userId,
        body
        )   
    }  
    
//UPDATE SOCIAL endPoint
 @Patch('patch-social') 
  @ApiOkResponse({
    type: SocialDto
  })
  async patchSocial(
    @Body() body: PatchSocialDto, 
    @SessionInfo() session: GetSessionInfoDto
    ):Promise<SocialDto>{
     return await this.socialService.patchSocial(
        session.userId,
        body
        )         
    }

}



