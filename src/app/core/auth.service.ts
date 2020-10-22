import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAuthenticationData } from '../forms/shared/authenticationData';
import { IUserData } from '../forms/shared/userdata';
import { ITokens } from '../shared/tokens';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private appUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) { }

  registerUser(userData: IUserData): Observable<number> {
    return this.http.post<number>(this.appUrl + "security/register", userData).pipe(
      catchError(this.handleError)
    );
  }

  login(authenticationData: IAuthenticationData): Observable<ITokens> {
    return this.http.post<ITokens>(this.appUrl + "login", authenticationData);
  }

  refreshTokens(): Observable<ITokens> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const refreshToken = {token: this.tokenService.getTokens().refreshToken};
    return this.http.post<ITokens>(this.appUrl + "security/refresh-token", JSON.stringify(refreshToken), {headers: headers}).pipe(
      tap((tokens: ITokens) => this.tokenService.saveTokens(tokens))
    );
  }

  logout(): void {
    this.tokenService.removeTokens();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.tokenService.hasToken();
  }

  hasRoleAdmin(): boolean{
    return this.tokenService.hasRoleAdmin();
  }

  getTokens(): ITokens {
    return this.tokenService.getTokens();
  }

  getAuthenticatedUserId(): number{
    return this.tokenService.getUserId() ? this.tokenService.getUserId() : -1;
  } 

  userSessionExpires(): boolean{
    return this.tokenService.refreshTokenExpired();
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    let errorMessage: string = `An error occurred: ${err.error.message}`;
    return throwError(errorMessage);
  }
}
