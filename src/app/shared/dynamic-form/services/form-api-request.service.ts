import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { FormBaseType } from '../component-models/form-base.type';
import { BoFormSC } from '../component-models/controls-models';
import { BoFormControl, BoFormGroup } from '../component-models';
import { BoFormRoot } from '../component-models/group-models';
import { BehAddLazyLoadingControls, ILLRequest } from './beh-models/beh-add-ll-controls.model';

import { ApiRequestService } from '../../../core/request/api-request.service';


@Injectable()
export class FormApiRequestService {

    constructor(private ars: ApiRequestService) {
    }

    /**
     * get form-config from api
     *
     * @param {string} url
     * @returns {Observable<T>}
     */
    getFormDataFromDb<T>(url: string): Observable<T> {
        return this.ars.request<T>(url).map(formData => {
            return formData;
        });
    }

    submitReactiveForm<T>(reactiveForm: BoFormRoot): Observable<T> {
        return this.ars.request<T>(reactiveForm.actionUrl,
            {
                body: this._getFormBody(reactiveForm),
            }, 'post');
    }

    /** for Lazy loading controls behavior {@link BehAddLazyLoadingControls} */

    /**
     * we check the request method and form the required query params for 'get' and 'body' for 'post' and 'patch'
     *
     * @param {ILLRequest} request
     * @param {FormBaseType} controlIns
     * @returns {Observable<T>}
     */
    getLLControls<T>(request: ILLRequest, controlIns: FormBaseType): Observable<T> {
        if (request.method === 'get') {
            return this.ars.request<T>(request.url,
                {params: this._getQueryParams(request, controlIns)});
        } else {
            return this.ars.request<T>(request.url,
                {
                    body: this._getBody(request.bodyParams, controlIns)
                }, request.method);
        }
    }

    /**
     * form the body of the request for the post request to api
     *
     * @param {object} toConvert
     * @param {FormBaseType} controlIns
     * @returns {HttpParams}
     * @private
     */
    private _getBody(toConvert: object, controlIns: FormBaseType): object {
        const body = {};

        if (toConvert) {
            Object.entries(toConvert).forEach(bi => {
                const bodyKey = bi[0];
                const controlKey = bi[1];

                const conIns = controlIns.root.get(controlKey);
                // Now this is only for sc (speed-collection) product, since we need to pass the value of the control
                // in the post request (as usual), but the product url
                if (conIns instanceof BoFormSC && conIns.selectedOption && conIns.selectedOption.url) {
                    body[bodyKey] = conIns.selectedOption.url;
                } else {
                    body[bodyKey] = conIns.value;
                }
            });
        }

        return body;
    }

    /**
     * get QueryParams for request if it's request {@link ILLRequest) have method 'get'
     *
     * @param {ILLRequest} request
     * @param {FormBaseType} controlIns
     * @returns {HttpParams}
     * @private
     */
    private _getQueryParams(request: ILLRequest, controlIns: FormBaseType): HttpParams {
        let params = new HttpParams();

        if (request.bodyParams) {
            Object.entries(request.bodyParams).forEach(qp => {
                const paramKey = qp[0];
                const controlPath = qp[1];

                params = params.append(paramKey, controlIns.getValueFromRoot(controlPath));
            });
        }

        return params;
    }

    /**
     * create 'body' for 'POST' request. Main action of form
     *
     * @param {BoFormGroup} controlIns
     * @param body
     * @returns {object | null}
     * @private
     */
    private _getFormBody(controlIns: BoFormGroup, body: any = {}): object | null {
        const controlsKeys = Object.keys(controlIns.value);

        controlsKeys.forEach(key => {
            const control = controlIns.get(key);

            // if group
            if (control instanceof BoFormGroup) {
                // if have property 'nestedBody'
                if (control.nestedBody) {
                    body[control.key] = {};
                    this._getFormBody(control, body[control.key]);
                } else {
                    this._getFormBody(control, body);
                }
            } else if (control instanceof BoFormControl && control.sendValue) { // if control
                body[control.key] = control.value;
            }

        });

        // if it's root return body
        if (controlIns instanceof BoFormRoot) {
            return controlIns.nestedBody ? {[controlIns.key]: body} : body;
        } else {
            return null;
        }
    }
}
