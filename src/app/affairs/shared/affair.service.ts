import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IEnrolledUser } from 'src/app/shared/enrolled-user';
import { ResponseData } from 'src/app/shared/response_data';
import { IAffair } from './affair';

@Injectable({
  providedIn: 'root'
})
export class AffairService {
  private affairsUrl = 'http://localhost:8080/affairs';
  private adminAffairsUrl = 'http://localhost:8080/admin/affairs';

  constructor(private http: HttpClient) { }

  createOrUpdateAffairById(affairToUpdate: FormData, affairId: number, userId: number){
    const options = {params: new HttpParams().set('ownerId', userId.toString())};
    if (affairId){return this.http.put(`${this.affairsUrl}/${affairId}`, affairToUpdate);}
    return this.http.post(this.affairsUrl, affairToUpdate, options);
  }
  
  getEnrolledForAffairUsers(affairId: number): Observable<IEnrolledUser[]>{
    return this.http.get<IEnrolledUser[]>(`${this.affairsUrl}/${affairId}/enrolled`);
  }

  getAffairs(pageNumber: number, pageSize: number): Observable<ResponseData<IAffair[]>>{
    const options = {params: new HttpParams().set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString())};
    return this.http.get<ResponseData<IAffair[]>>(this.affairsUrl, options).pipe(
       catchError(this.handleError)
    );
  }

  getUserAffairs(userId: number): Observable<IAffair[]>{
    return this.http.get<IAffair[]>(`${this.affairsUrl}/user/${userId}`).pipe(
       catchError(this.handleError)
    );
  }

  getAffairToUpdateById(affairId: number): Observable<IAffair>{
    return this.http.get<IAffair>(this.affairsUrl + "/" + affairId).pipe(
      catchError(this.handleError)
   );
  }

  deleteAffairById(affairId: number){
    return this.http.delete(`${this.affairsUrl}/${affairId}`);
  }

  delistUserFromAffair(affairId: number, userId: number){
    const options = {params: new HttpParams().set('userId', userId.toString())};
    return this.http.delete(`${this.affairsUrl}/delist/${affairId}`, options)
  }

  updateAffairRating(affairId: number, userId: number, affairRate: number): Observable<number>{
    const options = {params: new HttpParams().set('userId', userId.toString()).set('affairRate', affairRate.toString())};
    return this.http.patch<number>(this.affairsUrl + "/" + affairId, null, options).pipe(
       catchError(this.handleError)
    );
  }

  enrollUsers(affairId: number, userIds: number[]): Observable<number>{
    return this.http.patch<number>(this.affairsUrl + "/enroll/" + affairId, userIds).pipe(
       catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage: string = `An error occurred: ${err.error.message}`;
    return throwError(errorMessage);
  }
}
