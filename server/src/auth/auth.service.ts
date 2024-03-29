import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import { UserDTO } from 'src/users/user-dto';
import { MailService } from './mail.service';
import { Role } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private tokenService: TokenService, 
    private mailService: MailService 
    ){} 

 async singUp(email: string, password: string)
   {
    if(!email || !password){
       throw new BadRequestException({type: 'всі поля мають бути заповнені'})} 
    const candidate = await this.userService.findByEmail(email)
      if(candidate){
      throw new BadRequestException({type: 'така почта вже існує'})
      }    
    const salt = this.passwordService.getSalt()
    const hash = this.passwordService.getHash(password, salt) 
    
     // Отримуємо кількість користувачів у базі
    const userCount = await this.userService.count();

    // Визначаємо роль для нового користувача
    const role: Role = userCount === 0 ? Role.ADMIN : Role.USER;

    const profile =  await this.userService.create(email, salt, hash, role)
     
    // await this.mailService.sendActivationMailLink(email, profile.user.activationLink)
    const tokens  = await this.tokenService.generateToken({
    userId: profile.user.userId,
    email: profile.user.email,
    isActivated: profile.user.isActivated,
    role: profile.user.role,
})       
    
    await this.tokenService.saveToken(profile.user.userId, tokens.refreshToken)  
    return { profile, tokens }
  }
 async singIn(email: string, password: string): Promise<{
    tokens: { accessToken: string; refreshToken: string } 
    user: {userId: number, email : string, role: string, isActivated: boolean}
  }>{
    const candidate = await this.userService.findByEmail(email)
    if(!candidate){
     throw new BadRequestException({type: 'user-no-find'})
    }     
    const hash = this.passwordService.getHash(password, candidate.salt)
    if(hash !== candidate.hash){
      throw new BadRequestException({type: 'password-no-good'})
    }   
    const user = new UserDTO(candidate)    
    const tokens = await this.tokenService.generateToken({
    userId: user.userId,
    email: user.email,
    isActivated: user.isActivated,
    role: user.role,
})
    await this.tokenService.saveToken(user.userId, tokens.refreshToken)    
    return {tokens, user}    
  } 
}
