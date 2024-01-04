import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Res, UseGuards } from '@nestjs/common'
import { AccountService } from './account.service'
import { ApiOkResponse, ApiParam } from '@nestjs/swagger'
import { AccountDto,  ContactDtoSW,  ContactDtoSWActivate,  PatchAccountDto, PatchSocialDto,  ProfileDto, SocialDto,} from './dto'
import { CookieService } from 'src/auth/cookie.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { SessionInfo } from 'src/auth/session-info.decorator'
import { GetSessionInfoDto } from 'src/auth/dto'
import { Response } from 'express'
import { ContactService } from './contact.service'
import { SocialService } from './social.service'
import { Roles } from 'src/auth/roles.decorator'


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
  @ApiOkResponse({
    type: AccountDto
  })
 async getAccount(@SessionInfo() session: GetSessionInfoDto):Promise<AccountDto>{
   return await this.accountService.getAccount(session.userId)  
  }
//GET CONTACT BY ID  endPoint
  @Get(':id')   
  @ApiParam({ name: 'id', description: 'ID of the user', example: 44 })
  @ApiOkResponse({
    type:  ProfileDto
  })
  async getAccountInfo(       
    @Param('id') id: string    
  ):Promise<ProfileDto>{     
    return await this.accountService.getAccountInfo(parseInt(id, 10))
  }
//UPDATE PHONE CONTACT endPoint
  @Patch() 
  @ApiOkResponse({
    type: AccountDto
  })
  async patchAccount(
    @Body() body: PatchAccountDto, 
    @SessionInfo() session: GetSessionInfoDto
    ):Promise<AccountDto>{
      const account = await this.accountService.patchAccount(
        session.userId,
        body
        )
        return account
    }
 
//DELETE CONTACT ID endPoint    
  @Delete(':id')  
  @Roles('USER') 
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'ID of the user', example: 44 })  
  @ApiOkResponse() 
  async deleteUser(       
    @Param('id') id: string, 
    @Res({passthrough: true}) res: Response, 
    @SessionInfo() session: GetSessionInfoDto  
  ){            
   const userDelete =  await this.accountService.deleteUser(parseInt(id, 10), session.userId)
     this.cookieService.removeToken(res)  
   return userDelete
  }

//UPDATE PHONE CONTACT endPoint
 @Patch('patch-contact') 
 @ApiOkResponse({
    type: ContactDtoSW
  })
 async patchContact(
    @Body() body: ContactDtoSW, 
    @SessionInfo() session: GetSessionInfoDto
    ):Promise<{isActivated: boolean}>{
      const isActivated  = await this.contactService.patchContact(
        session.userId,
        body
        )            
      return isActivated
    }


  //ACTIVATION EMAIL CONTACT endPoint
 @Patch('patch-contact-activate') 
 @ApiOkResponse({
    type: ContactDtoSWActivate
  })
 async patchVerifyPhone(
    @Body() body: ContactDtoSWActivate, 
    @SessionInfo() session: GetSessionInfoDto
    ):Promise<{isActivated: boolean}>{
      const isActivated  = await this.contactService.patchVerifyPhone(
        session.userId,
        body
        )            
      return isActivated
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
      const contact = await this.socialService.patchSocial(
        session.userId,
        body
        )
        return contact
    }

}


