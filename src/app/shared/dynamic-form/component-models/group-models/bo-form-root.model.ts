import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { BoFormGroup } from '../bo-form-group.model';
import { FormBaseType, IAnyObj } from '../form-base.type';
import { IBoFormRoot } from './bo-form-root.interface';


export class BoFormRoot extends BoFormGroup implements IBoFormRoot {
    readonly formType: 'widget' | 'page';
    readonly actionUrl: string;

    /* not config property */
    /**
     * show loading
     */
    loading = true;
    responseError: HttpErrorResponse;
    formDefaultValue: any;

    private _lzControlsChanges = new Subject<string[]>();
    lzControlsChanges$ = this._lzControlsChanges.asObservable();

    // private removeControlChanges = new Subject<void>();
    // removeControlChanges$ = this.removeControlChanges.asObservable();

    constructor(options: IAnyObj = {}) {
        super(options);
        this.formType = this.getProperty(options, 'formType', 'literalString', false, ['widget', 'page']) || 'page';
        this.actionUrl = this.getProperty(options, 'actionUrl', 'string') || '';
        // save default form value when form was created.
        this.formDefaultValue = this.value || null;
    }

    shareLZControls(cKeys: string[]) {
        this._lzControlsChanges.next(cKeys);
    }

    // shareRemoveControls() {
    //     this.removeControlChanges.next();
    // }

    /**
     * add the default value of the LazyLoaded control to the object of default values ​​of the form (formDefaultValue)
     * @param {FormBaseType} controlIns
     */
    addControlDefaultValue(controlIns: FormBaseType): void {
        // get path to control
        const pathArr = this.getPathOfKeysFromRoot(controlIns, []);
        pathArr.push(controlIns.key);

        let obj = this.formDefaultValue;

        pathArr.forEach(key => {
            if (controlIns.key === key) {
                obj[key] = controlIns.value;
            }

            if (obj.hasOwnProperty(key)) {
                obj = this.formDefaultValue[key];
            }
        });
    }

    /**
     * remove default value of controls which was deleted or replaced
     * @param {FormBaseType} controlIns
     */
    removeControlDefaultValue(controlIns: FormBaseType): void {
        // get path to control
        const pathArr = this.getPathOfKeysFromRoot(controlIns, []);
        pathArr.push(controlIns.key);

        let obj = this.formDefaultValue;

        pathArr.forEach(key => {
            if (controlIns.key === key) {
                delete obj[key];
            }

            if (obj.hasOwnProperty(key)) {
                obj = this.formDefaultValue[key];
            }
        });
    }
}
