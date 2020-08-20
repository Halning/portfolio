import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ApiRequestService {
  isRequestProgress = false;

  constructor(private http: HttpClient) {}

  request<T>(url: string, options = Object.create(null), method = 'get'): Observable<any> {
    return this.http.request<T>(method, url, options).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  requestEvent<T>(url: string, options = Object.create(null), method = 'get'): Observable<HttpEvent<T>> {
    options['reportProgress'] = true;

    const req = new HttpRequest(method, url, options);

    return this.http.request<T>(req).pipe(
      tap((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request sent!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header received!');
            break;
          case HttpEventType.DownloadProgress:
            const kbLoaded = Math.round(event.loaded / 1024);
            console.log(`Download in progress! ${kbLoaded}Kb loaded`);
            break;
          case HttpEventType.Response:
            console.log('😺 Done!', event.body);
        }
      })
    );
  }
}
