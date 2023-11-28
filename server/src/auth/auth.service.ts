import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { UserDTO } from 'src/users/user-dto';
import { TokenService } from './token.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private tokenService: TokenService
   
    ){}

 async singUp(email: string, password: string): Promise<{
   tokens: {accessToken: string; refreshToken: string},
   userDto: {userId: number, email : string, role: string, isActivated: boolean} }>{
  if(!email || !password){ throw new BadRequestException({type: 'всі поля мають бути заповнені'})} 
  const user = await this.userService.findByEmail(email)
    if(user){
     throw new BadRequestException({type: 'така почта вже існує'})
    }
    const activationLink = uuid()
    const salt = this.passwordService.getSalt()
    const hash = this.passwordService.getHash(password, salt)
    const newUser =  await this.userService.create(email, salt, hash, activationLink)
    const userDto = new UserDTO(newUser)
    const tokens = await this.tokenService.generateToken({
    userId: userDto.userId,
    email: userDto.email,
    isActivated: userDto.isActivated,
    role: userDto.role,
})
   
    await this.tokenService.saveToken(userDto.userId, tokens.refreshToken)    
    return {tokens, userDto}
  }
 async singIn(email: string, password: string): Promise<{
   tokens: { accessToken: string; refreshToken: string } 
   userDto: {userId: number, email : string, role: string, isActivated: boolean}
  }>{
    const user = await this.userService.findByEmail(email)
    if(!user){
     throw new BadRequestException({type: 'user-no-find'})
    }     
    const hash = this.passwordService.getHash(password, user.salt)
    if(hash !== user.hash){
      throw new BadRequestException({type: 'password-no-good'})
    }   
     const userDto = new UserDTO(user)    
    const tokens = await this.tokenService.generateToken({
    userId: userDto.userId,
    email: userDto.email,
    isActivated: userDto.isActivated,
    role: userDto.role,
})
    await this.tokenService.saveToken(userDto.userId, tokens.refreshToken)    
    return {tokens, userDto}    
  }
  async singOut(){}
}
