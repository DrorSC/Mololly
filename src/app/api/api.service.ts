import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseApiUrl: string = '';
  headers: HttpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = environment.serverUrl;
    this.headers = this.headers.set("X-Riot-Token", environment.riotApiKey);
  }

  getRequest(requestUrl): Observable<any> {
    return this.httpClient
      .get(this.baseApiUrl + requestUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );

  }

  postRequest(requestUrl, body): Observable<any> {
    return this.httpClient
      .post(this.baseApiUrl + requestUrl, body, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
