import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseData } from '../response_data';
import { IUser } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private adminUsersUrl = 'http://localhost:8080/admin/users';

  constructor(private http: HttpClient) { }

  getUsers(pageNumber: number, pageSize: number, filter: string): Observable<ResponseData<IUser[]>>{
    const options = {params: new HttpParams()
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
          .set('filter', filter.toString())};

    return this.http.get<ResponseData<IUser[]>>(this.adminUsersUrl, options).pipe(
       catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage: string = `An error occurred: ${err.error.message}`;
    return throwError(errorMessage);
  }
}
