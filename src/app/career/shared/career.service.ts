import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseData } from 'src/app/shared/response_data';
import { IApplication } from './application';
import { IJobOffer } from './job-offer';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private careersUrl = 'http://localhost:8080/careers';
  private adminCareersUrl = 'http://localhost:8080/admin/careers';

  constructor(private http: HttpClient) { }

  createOrUpdateJobOfferById(jobOfferToUpdate: FormData, jobOfferId: number){
    if (jobOfferId){return this.http.put(`${this.adminCareersUrl}/${jobOfferId}`, jobOfferToUpdate);}
    return this.http.post(this.adminCareersUrl, jobOfferToUpdate);
  }

  createApplicant(applicantData: FormData, jobOfferId: number, userId: number): Observable<number>{
    const options = {params: new HttpParams()
      .set('userId', userId.toString())};

    return this.http.post<number>(`${this.careersUrl}/${jobOfferId}/applicants`, applicantData, options).pipe(
      catchError(this.handleError)
    )
  }

  getAllJobOffers(pageNumber: number, pageSize: number, keyword: string): Observable<ResponseData<IJobOffer[]>>{
    const options = {params: new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('keyword', keyword.toString())};

    return this.http.get<ResponseData<IJobOffer[]>>(this.careersUrl, options).pipe(
       catchError(this.handleError)
    );
  }

  getAllApplications(jobOfferid: number, pageNumber: number, pageSize: number, keyword: string): Observable<ResponseData<IApplication[]>>{
    const options = {params: new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('keyword', keyword.toString())};

    return this.http.get<ResponseData<IApplication[]>>(`${this.adminCareersUrl}/${jobOfferid}/applicants`, options).pipe(
       catchError(this.handleError)
    );
  }

  getApplicant(jobOfferId: number, applicantId: number): Observable<IApplication>{
    return this.http.get<IApplication>(`${this.adminCareersUrl}/${jobOfferId}/applicants/${applicantId}`).pipe(
      catchError(this.handleError)
    )
  }

  getJobOfferById(jobOfferId: number): Observable<IJobOffer>{
    return this.http.get<IJobOffer>(`${this.careersUrl}/${jobOfferId}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteJobOffer(jobOfferId: number){
    return this.http.delete(`${this.adminCareersUrl}/${jobOfferId}`)
  }

  deleteApplication(jobOfferId: number, applicantId: number): Observable<number>{
    return this.http.delete<number>(`${this.adminCareersUrl}/${jobOfferId}/applicants/${applicantId}`);
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage: string = `An error occurred: ${err.error.message}`;
    return throwError(errorMessage);
  }
}
