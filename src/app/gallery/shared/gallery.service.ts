import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseData } from 'src/app/shared/response_data';
import { IGallery } from './gallery';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private galleryUrl = 'http://localhost:8080/gallery';

  constructor(private http: HttpClient) { }

  getGallery(pageNumber: number, pageSize: number): Observable<ResponseData<IGallery[]>>{
    const options = {params: new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())};

    return this.http.get<ResponseData<IGallery[]>>(this.galleryUrl, options).pipe(
       catchError(this.handleError)
    );
  }

  addPicture(pictureData: FormData): Observable<number>{
    return this.http.post<number>(this.galleryUrl, pictureData).pipe(
      catchError(this.handleError)
    );
  }

  deletePicture(pictureId: number): Observable<number>{
    return this.http.delete<number>(`${this.galleryUrl}/${pictureId}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage: string = `An error occurred: ${err.error.message}`;
    return throwError(errorMessage);
  }
}
