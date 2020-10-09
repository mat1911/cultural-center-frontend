import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { NotificationService } from '../core/notification.service';
import { ITokens } from './tokens';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    private isRefreshing: boolean = false;
    private tmpTokenStorage: BehaviorSubject<any> = new BehaviorSubject<any>(null); //work like semaphore
    
    constructor(private authService: AuthService, private notificationService: NotificationService){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(this.authService.userSessionExpires()){
            this.authService.logout();
            this.notificationService.dispatch({message: 'Nastąpiło automatyczne wylogowanie! Proszę zalogować się ponownie.', type: 'success', dismissible: true});
        }

        if(this.authService.isLoggedIn()){
            req = this.appendToken(req, this.authService.getTokens().accessToken);
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status === 401){
                    return this.handle401(req, next);
                }else{
                    return throwError(error);
                }
            })
        );
    }

    private appendToken(req: HttpRequest<any>, token: string): HttpRequest<any>{
        return req.clone({setHeaders: {'Authorization': `Bearer ${token}`}})
    }

    private handle401(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(!this.isRefreshing){
            this.isRefreshing = true;
            this.tmpTokenStorage.next(null);

            return this.authService.refreshTokens().pipe(
                switchMap((tokens: ITokens) => {
                    this.isRefreshing = false;
                    this.tmpTokenStorage.next(tokens.accessToken);
                    return next.handle(this.appendToken(req, tokens.accessToken));
                }));
        } else {
            return this.tmpTokenStorage.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.appendToken(req, token));
                }));
        }
    }
}