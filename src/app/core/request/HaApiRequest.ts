import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { BaseApiRequest } from './BaseApiRequest';
import { ApiRequestHeader } from './ApiRequestHeader';
import { HaLoaderService } from '../../shared/ha-loader/ha-loader.service';

@Injectable()

export class HaApiRequest extends BaseApiRequest {

    constructor(public http: Http, public loader: HaLoaderService) {
        super(http);
        this.requestHeader = new ApiRequestHeader();
    }

    request<T>(url: string, options?: RequestOptionsArgs, noCache?: boolean): Observable<T> {
        this.loader.showLoader();
        return super.request(url, options)
            .map(res => {
                this.loader.hideLoader();
                return res;
            })
            .catch((error: any) => {
                this.loader.hideLoader();
                return Observable.throw(error);
            });

    }

    parseGetParams(param: any): string {
        if (param !== undefined) {
            return '?' + Object.keys(param).map(function (k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(param[k]);
                }).join('&');
        }
    }
}
