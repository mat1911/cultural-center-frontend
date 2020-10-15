import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseData } from 'src/app/shared/response_data';
import { ICompetition } from './competition';
import { IContestant } from './contestant';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  private competitionsUrl: string = 'http://localhost:8080/competitions';
  private competitionsAdminUrl: string = 'http://localhost:8080/admin/competitions';

  constructor(private http: HttpClient) { }

  createOrUpdateCompetitionById(competitionData: FormData, competitionId: number){
    if (competitionId){return this.http.put(this.competitionsAdminUrl + '/' + competitionId, competitionData);}
    return this.http.post(this.competitionsAdminUrl, competitionData);
  }

  createContestant(contestantData: FormData, competitionId: number, userId: number){
    const options = {params: new HttpParams().set('userId', userId.toString())};
    return this.http.post(this.competitionsUrl + '/' +  competitionId + '/contestants', contestantData, options);
  }
  
  getCompetitions(pageNumber: number, pageSize: number): Observable<ResponseData<ICompetition[]>>{
    const options = {params: new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())};

    return this.http.get<ResponseData<ICompetition[]>>(this.competitionsUrl, options).pipe(
       catchError(this.handleError)
    );
  }

  getCompetitionById(competitionId: number): Observable<ICompetition>{
    return this.http.get<ICompetition>(this.competitionsUrl + "/" + competitionId).pipe(
      catchError(this.handleError)
    );
  }

  getCompetitionContestants(competitionId: number, pageNumber: number, pageSize: number, keyword: string): Observable<ResponseData<IContestant[]>>{
    const options = {params: new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('keyword', keyword.toString())};

    return this.http.get<ResponseData<IContestant[]>>(this.competitionsUrl + "/" + competitionId + "/contestants", options).pipe(
      catchError(this.handleError)
    );
  }

  
  getNotAcceptedCompetitionContestants(competitionId: number, pageNumber: number, pageSize: number): Observable<ResponseData<IContestant[]>>{
    const options = {params: new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())};

    return this.http.get<ResponseData<IContestant[]>>(`${this.competitionsAdminUrl}/${competitionId}/contestants`, options).pipe(
      catchError(this.handleError)
    );
  }

  getContestantResult(competitionId: number, contestantId: number): Observable<IContestant>{
    return this.http.get<IContestant>(`${this.competitionsUrl}/${competitionId}/contestants/${contestantId}`).pipe(
      catchError(this.handleError)
    );
  }

  voteForContestant(competitionId: number, contestantId: number, voterId: number): Observable<number>{
    console.log(competitionId);
    console.log(contestantId);
    console.log(voterId);

    const options = {params: new HttpParams().set('voterId', voterId.toString())};
    return this.http.post<number>(`${this.competitionsUrl}/${competitionId}/contestants/${contestantId}`, null, options).pipe(
      catchError(this.handleError)
    );
  }

  changeContestantAcceptance(competitionId: number, contestantId: number, isAccepted: boolean): Observable<number>{
    const options = {params: new HttpParams().set('isAccepted', isAccepted.toString())};
    return this.http.patch<number>(`${this.competitionsAdminUrl}/${competitionId}/contestants/${contestantId}`, null, options).pipe(
       catchError(this.handleError)
    );
  }

  deleteCompetition(competitionId: number){
    return this.http.delete(this.competitionsAdminUrl + '/' + competitionId);
  }

  deleteContestant(competitionId: number, contestantId: number){
    return this.http.delete(`${this.competitionsAdminUrl}/${competitionId}/contestants/${contestantId}`);
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage: string = `An error occurred: ${err.error.message}`;
    return throwError(errorMessage);
  }
}
