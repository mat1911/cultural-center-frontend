import { Injectable } from '@angular/core';
import { ITokens } from '../shared/tokens';

import jwt_decode from 'jwt-decode';


const ACCESS_TOKEN: string = 'access_token';
const REFRESH_TOKEN: string = 'refresh_token';
const ADMIN = 'ROLE_ADMIN';
const USER = 'ROLE_USER';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  removeTokens(): void{
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  saveTokens(tokens: ITokens): void{
    localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
  }

  getUserId(): any{
    if(localStorage.getItem(ACCESS_TOKEN) == null){return false;}
    return jwt_decode(localStorage.getItem(ACCESS_TOKEN)).sub;
  }

  getTokens(): ITokens{
    return {accessToken: localStorage.getItem(ACCESS_TOKEN), refreshToken: localStorage.getItem(REFRESH_TOKEN)};
  }

  hasRoleAdmin(): boolean{
    if(localStorage.getItem(ACCESS_TOKEN) == null){return false;}
    let userInfo = jwt_decode(localStorage.getItem(ACCESS_TOKEN));
    return userInfo.roles.indexOf(ADMIN) > -1;
  }

  hasRoleUser(): boolean{
    if(localStorage.getItem(ACCESS_TOKEN) == null){return false;}
    let userInfo = jwt_decode(localStorage.getItem(ACCESS_TOKEN));
    return userInfo.roles.indexOf(USER) > -1;
  }

  hasToken(): boolean{
    return localStorage.getItem(ACCESS_TOKEN) != null;
  }

  refreshTokenExpired(): boolean{
    if(localStorage.getItem(REFRESH_TOKEN) == null){return false;}
    let refreshToken = jwt_decode(localStorage.getItem(REFRESH_TOKEN));
    return refreshToken.exp < Date.now() / 1000;
  }
}
