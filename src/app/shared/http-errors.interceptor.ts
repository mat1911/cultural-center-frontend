import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/notification.service';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor{

    constructor(private notificationService: NotificationService){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = "";
                    let errorStatusCode = 0;

                    if (error.error instanceof ErrorEvent){ // client side
                        errorMessage = error.error.message;
                        errorStatusCode = error.status;
                    } else { //server side
                        errorMessage = error.error.message;
                        errorStatusCode = error.error.code;
                    }
                    console.log(error);
                    this.notificationService.dispatch({statusCode: errorStatusCode, message: " Message: " + errorMessage + 
                        " [Status code: " + errorStatusCode + "]", type: 'danger'});
                    window.scroll(0,0);
                    return throwError(error);
                })
            )
    }

}