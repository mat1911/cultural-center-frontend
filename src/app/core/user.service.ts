import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMessage } from '../contact/message';
import { ResponseData } from '../shared/response_data';
import { IUser } from '../shared/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:8080/users';
  private securityUrl = 'http://localhost:8080/security';

  constructor(private http: HttpClient) { }

  getUsers(pageNumber: number, pageSize: number, filter: string): Observable<ResponseData<IUser[]>>{
    const options = {params: new HttpParams()
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
          .set('filter', filter.toString())};

    return this.http.get<ResponseData<IUser[]>>(this.usersUrl, options).pipe(
       catchError(this.handleError)
    );
  }

  getUserById(userId: number): Observable<IUser>{
    return this.http.get<IUser>(`${this.usersUrl}/${userId}`).pipe(
      catchError(this.handleError)
    )
  }

  updateUserProfile(userData: IUser, userId: number): Observable<number>{
    return this.http.put<number>(`${this.usersUrl}/${userId}`, userData).pipe(
      catchError(this.handleError)
    )
  }

  changeUserPassword(userPassword: IUser, userId: number): Observable<number>{
    return this.http.patch<number>(`${this.usersUrl}/${userId}`, userPassword).pipe(
      catchError(this.handleError)
    )
  }

  setNewUserPassword(userPassword: IUser, token: string): Observable<number>{
    const options = {params: new HttpParams().set('token', token.toString())};
    return this.http.patch<number>(`${this.securityUrl}/remind-password`, userPassword, options).pipe(
      catchError(this.handleError)
    )
  }

  sendUserMessage(message: IMessage): Observable<number>{
    return this.http.post<number>(`${this.usersUrl}/messages`, message).pipe(
      catchError(this.handleError)
    )
  }

  remindPassword(userEmail: string): Observable<number>{
    const options = {params: new HttpParams().set('userEmail', userEmail.toString())};
    return this.http.post<number>(`${this.securityUrl}/forgot`, null, options).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage: string = `An error occurred: ${err.error.message}`;
    return throwError(errorMessage);
  }
}
