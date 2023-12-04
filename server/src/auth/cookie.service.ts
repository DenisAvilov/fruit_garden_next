import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  static refreshTokenKey = 'refresh-token'
  setToken(res : Response, token: string){
    res.cookie(CookieService.refreshTokenKey, token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
  }
  removeToken(res : Response,){
    res.clearCookie(CookieService.refreshTokenKey)
  }
}
