import { Injectable } from '@angular/core';
import { INews } from '../shared/news';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map} from 'rxjs/operators'
import { ResponseData } from '../../shared/response_data';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsUrl = 'http://localhost:8080/news';

  constructor(private http: HttpClient) { }

  getNews(pageNumber: number, pageSize: number): Observable<ResponseData<INews[]>>{
    const options = {params: new HttpParams().set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString())};
    return this.http.get<ResponseData<INews[]>>(this.newsUrl, options).pipe(
       tap(data => console.log('ALL: ' + JSON.stringify(data))),
       catchError(this.handleError)
    );
  }

  getNewsById(newsId: number): Observable<INews>{
    return this.http.get<INews>(this.newsUrl + '/' + newsId).pipe(
       tap(data => console.log('ALL: ' + JSON.stringify(data))),
       catchError(this.handleError)
    );
  }

  getNewsToUpdateById(newsId:number): Observable<INews>{
    return this.http.get<INews>(this.newsUrl + '/edit/' + newsId).pipe(
      catchError(this.handleError)
   );
  }

  createOrUpdateNewsById(newsToUpdate: FormData, newsId: number){
    if (newsId){return this.http.put(this.newsUrl + '/' + newsId, newsToUpdate);}
    return this.http.post(this.newsUrl, newsToUpdate);
  }

  deleteNewsById(newsId: number){
    return this.http.delete(this.newsUrl + '/' + newsId);
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage: string = `An error occurred: ${err.error.message}`;
    return throwError(errorMessage);
  }
}
