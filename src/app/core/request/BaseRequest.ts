import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IRequestHeader } from './IRequestHeader';

export class BaseRequest {

    requestHeader: IRequestHeader;

    constructor(public http: Http) {
    }

    request<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
        options = this.createRequestOptions(options);
        return <any>this.http.request(url, options)
            .map(this.extractData)
            .catch(this.handleServerError);
    }

    createRequestOptions(options: RequestOptionsArgs = {}): RequestOptionsArgs {
        options.headers = this.requestHeader.createHeaders();
        options.method = options.method ? options.method : 'GET';
        return options;
    }

    private extractData(res: Response | any) {
        let resultResponse: any = {};

        // if 204 response with body === null
        if (res._body === null) {
            res._body = '';
        }

        try {
            resultResponse = res.json();
        } catch (e) {
            resultResponse = res;
        }

        return resultResponse;
    }

    private handleServerError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        // We"d also dig deeper into the error to get a better message
        console.log(error);
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

}
