import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseData } from 'src/app/shared/response_data';
import { IArticle } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articlesUrl = 'http://localhost:8080/articles';
  private adminArticlesUrl = 'http://localhost:8080/admin/articles';

  constructor(private http: HttpClient) { }

  createOrUpdateArticleById(articleToUpdate: FormData, articleId: number, userId: number){
    const options = {params: new HttpParams().set('authorId', userId.toString())};
    if (articleId){return this.http.put(this.articlesUrl + '/' + articleId, articleToUpdate);}
    return this.http.post(this.articlesUrl, articleToUpdate, options);
  }

  getArticles(pageNumber: number, pageSize: number, keyword: string = ''): Observable<ResponseData<IArticle[]>>{
    const options = {params: new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('keyword', keyword.toString())};

    return this.http.get<ResponseData<IArticle[]>>(this.articlesUrl, options).pipe(
       catchError(this.handleError)
    );
  }

  getNotAcceptedArticles(pageNumber: number, pageSize: number): Observable<ResponseData<IArticle[]>>{
    const options = {params: new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())};

    return this.http.get<ResponseData<IArticle[]>>(this.adminArticlesUrl, options).pipe(
       catchError(this.handleError)
    );
  }

  getArticleById(articleId: number): Observable<IArticle>{
    return this.http.get<IArticle>(this.articlesUrl + '/' + articleId).pipe(
      catchError(this.handleError)
   );
  }

  updateArticleRating(articleId: number, userId: number, articleRate: number): Observable<number>{
    const options = {params: new HttpParams().set('userId', userId.toString()).set('articleRate', articleRate.toString())};
    return this.http.patch<number>(this.articlesUrl + "/" + articleId, null, options).pipe(
       catchError(this.handleError)
    );
  }

  changeArticleAcceptance(articleId: number, isAccepted: boolean){
    const options = {params: new HttpParams().set('isAccepted', isAccepted.toString())};
    return this.http.patch<number>(this.adminArticlesUrl + "/" + articleId, null, options).pipe(
       catchError(this.handleError)
    );
  }

  deleteArticle(articleId: number, userId: number){
    const options = {params: new HttpParams().set('userId', userId.toString())};
    return this.http.delete(this.articlesUrl + '/' + articleId, options);
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage: string = `An error occurred: ${err.error.message}`;
    return throwError(errorMessage);
  }
}
