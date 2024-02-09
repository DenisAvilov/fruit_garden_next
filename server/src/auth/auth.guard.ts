import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { CookieService } from './cookie.service';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    private readonly reflector: Reflector
    ){}
 
 async canActivate( context: ExecutionContext):Promise<boolean> {
   const req = context.switchToHttp().getRequest()
   const token = req.cookies[CookieService.refreshTokenKey]

   // Якщо його немає, і доступ без реєстрації дозволений, то дозволити доступ
   if (!token && this.isPublicRoute(context)) {
     return true;
   }
   try{
    const sessionInfo = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_REFRESH_TOKEN_SECRET})    
    req['session'] = sessionInfo
    req['roles'] = sessionInfo.role;   
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
     console.log('Roles: ', roles ) 
    
      if (!roles || roles.length === 0) {
        // Якщо ролі не визначено, дозволяємо доступ
        return true;
      }

       // Якщо користувач не має токену, і доступ без реєстрації не дозволений,
     // то відмовляємо в доступі
     if (!token && !this.isPublicRoute(context)) {
       throw new UnauthorizedException('Access denied');
     }

      const userRoles = Array.isArray(req.roles) ? req.roles : [req.roles];
      // Перевірка, чи у користувача є необхідні ролі
      const hasRequiredRole = () => roles.some(role => userRoles.includes(role));

      if (userRoles && hasRequiredRole()) {        
        return true;
      }       
      throw new UnauthorizedException('Access denied');
   }
   catch(error){
      console.error('Error in AuthGuard:', error);     
      throw new UnauthorizedException('Access denied');
   }
   }

    // Метод для перевірки, чи маршрут є публічним (доступ без реєстрації дозволений)
 private isPublicRoute(context: ExecutionContext): boolean {
   const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
   return isPublic || false;
 }
}