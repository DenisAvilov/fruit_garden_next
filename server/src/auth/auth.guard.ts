import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CookieService } from './cookie.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService){}
  canActivate(
    context: ExecutionContext,    
  ): boolean | Promise<boolean> | Observable<boolean> {
   const req = context.switchToHttp().getRequest()
   const token = req.cookies[CookieService.tokenKey]

   if(!token){
    throw new  UnauthorizedException()
   }
  
   try{
    const sessionInfo = this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET_KEY})
    req['session'] = sessionInfo
   }

   catch{
    throw new  UnauthorizedException()
   }

   return true;
  }
}

//Часто делают запись информациї о сесії в цьому файлі