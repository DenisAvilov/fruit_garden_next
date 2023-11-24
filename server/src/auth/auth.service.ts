import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
//Цей сервіс відповідає за логіку додатку
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService
    ){}

 async singUp(email: string, password: string){
    const user = await this.userService.findByEmail(email)
    if(user){
     throw new BadRequestException({type: 'email-exist'})
    }
    const salt = this.passwordService.getSalt()
    const hash = this.passwordService.getHash(password, salt)
    const newUser =  await this.userService.create(email, salt, hash,)
    const accessToken = await this.jwtService.signAsync({
      id:newUser.id,
      email: newUser.email
    })
    return {accessToken}
  }
 async singIn(email: string, password: string){
     const user = await this.userService.findByEmail(email)
    if(!user){
     throw new BadRequestException({type: 'user-no-find'})
    }     
    const hash = this.passwordService.getHash(password, user.salt)
    if(hash !== user.hash){
      throw new BadRequestException({type: 'password-no-good'})
    }   
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email
    })
    return {accessToken}
  }
  singOut(){}
}
