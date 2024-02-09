import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ActivationLink, GetSessionInfoDto, SingInBodyDto, SingUpBodyDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express'
import { CookieService } from './cookie.service';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session-info.decorator';
import { MailService } from './mail.service';
import { Public } from './pablic.decorator';
import { Roles } from './roles.decorator';

@ApiTags('auth')
@Controller('auth')
@UseGuards(AuthGuard) 
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService, 
    private cookieService: CookieService){}

  @Post('sing-up')
  @Public()
  @ApiCreatedResponse()
  async singUp(@Body() body: SingUpBodyDto, @Res({passthrough: true}) res: Response){
    const profile = await this.authService.singUp(body.email, body.password)
    this.cookieService.setToken(res, profile.tokens.refreshToken)
    return profile
  }  

  @Post('sing-in')
  @Public()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async singIn(@Body() body: SingInBodyDto,  @Res({passthrough: true}) res: Response){
    const profile = await this.authService.singIn(body.email, body.password)
    this.cookieService.setToken(res, profile.tokens.refreshToken)
    return profile
  }

  @Post('sing-out')
  @Roles('ADMIN', 'USER')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK) 
  async singOut(@Res({passthrough: true}) res: Response){
    this.cookieService.removeToken(res)
  }

  @Get('session')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: GetSessionInfoDto
  })
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto){
    return session
  }

 
  @Get(':activeLink')
  @Roles('ADMIN','USER')
  @ApiOkResponse({type: ActivationLink})
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  activateMail(
    @Param('activeLink') activeLink: string, 
    @SessionInfo() session: GetSessionInfoDto
    ){  
     return this.mailService.activeMail(activeLink, session.userId)
   
  }
}

