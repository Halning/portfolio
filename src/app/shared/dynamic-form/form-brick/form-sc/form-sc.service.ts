import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ApiRequestService } from '../../../../core/request/api-request.service';


@Injectable()
export class FormScService {

    constructor(private ars: ApiRequestService) {
    }

    getScOptions<T>(url: string, term: string): Observable<T> {
        return this.ars.request<T>(url, {params: new HttpParams().set('q', term)});
    }
}
