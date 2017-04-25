import { RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BaseRequest } from './BaseRequest';

export class BaseApiRequest extends BaseRequest {

    private baseUrl = 'https://us-central1-portfolio-2a12b.cloudfunctions.net';

    request<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
        this.baseUrl = 'https://us-central1-portfolio-2a12b.cloudfunctions.net';

        url = this.baseUrl + url;

        return super.request<T>(url, options)
            .map(res => {
                return res;
            });
    }
}
