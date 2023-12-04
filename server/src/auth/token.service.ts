import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

@Injectable()
export class TokenService {
  constructor(
     private jwtService: JwtService
  ){}
  
  async generateToken(preload: {
      userId: number,
      email: string, 
      isActivated: boolean, 
      role: string}){       
     const accessToken = await this.jwtService.signAsync(preload, {
      expiresIn: '15m',  
    })
     const refreshToken = await this.jwtService.signAsync(preload, {
      expiresIn: '12d', 
      secret: process.env.JWT_REFRESH_TOKEN_SECRET 
    })    
     return {
      accessToken,
      refreshToken
     }
  }

  async saveToken(userId: number, refreshToken: string){
    const tokenData = await prisma.token.findFirst({where: {userId}})        
    if(tokenData){
       return prisma.token.update({
      where: {userId},
      data: {refreshToken},
    });
    }      
    const token = await  prisma.token.create({data:{userId, refreshToken}})     
    return token  
  }

}
