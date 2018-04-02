import { FormControl, ValidatorFn, Validators } from '@angular/forms';

import { IBoFormControl } from './interfaces/bo-form-control.interface';

import * as m from './bo-form-mixin.model';
import * as e from '../exceptions/controls-exceptions/control-exceptions.mixin';
import { IAnyObj } from './form-base.type';

export interface FCMixin extends m.IM1, m.IM2, e.IEM, FormControl, m.Constructable<FCMixin> {
}

export type ControlTypeControl = 'sc' | 'sc-widget' | 'textbox' | 'radio' | 'radio-big' | 'radio-center' | 'select'
    | 'counter' | 'counter-price' | 'checkbox' | 'datePicker';

export const controlTypeArray = ['sc', 'sc-widget', 'textbox', 'radio', 'radio-big', 'radio-center', 'select',
    'counter', 'counter-price', 'checkbox', 'datePicker'];

export class BoFormControl<T> extends (<FCMixin>m.M2(m.M1(e.EM(FormControl)))) implements IBoFormControl<T> {
    readonly key: string;
    value: T;
    readonly controlType: ControlTypeControl;
    label: string;
    readonly validation: IAnyObj[] | null;
    readonly order: number;
    behaviors: IAnyObj[] | null;
    readonly grid: string;
    disabledView: boolean;
    hidden: boolean;
    readonly sendValue: boolean;
    /* not config property */
    nonExistingDependControls: string[] = [];

    constructor(options: {
        value?: T,
        key?: string,
        controlType?: ControlTypeControl,
        label?: string,
        validation?: IAnyObj[] | null,
        order?: number,
        behaviors?: IAnyObj[] | null;
        grid?: string;
        disabledView?: boolean;
        hidden?: boolean;
        sendValue?: boolean;
    } = {}) {
        super();
        this.value = options.value; // value type check in control classes like 'BoFormCheckbox'
        this.key = this.getProperty(options, 'key', 'string', true);
        this.controlType = this.getProperty(options, 'controlType', 'literalString', true,
            controlTypeArray);
        this.label = this.getProperty(options, 'label', 'string') || '';
        this.validation = this.getProperty(options, 'validation', 'array') || null;

        const order = this.getProperty(options, 'order', 'number');
        this.order = order === undefined ? 1 : order;
        this.behaviors = this.getProperty(options, 'behaviors', 'array') || null;
        this.grid = this.getProperty(options, 'grid', 'string') || 'col-12';
        this.disabledView = this.getProperty(options, 'disabledView', 'boolean') || false;
        this.hidden = this.getProperty(options, 'hidden', 'boolean') || false;

        const sendValue = this.getProperty(options, 'sendValue', 'boolean');
        this.sendValue = sendValue === undefined ? true : sendValue;

        this.setValidators(this._getValidators(options.validation));
    }

    /**
     * set field validation depend this.validation value from api config
     * @param validation
     * @returns {ValidatorFn[]}
     * @private
     */
    private _getValidators(validation: IAnyObj): ValidatorFn[] | null {
        if (validation) {
            return validation.map(valItem => {
                if (valItem.hasOwnProperty('required')) {
                    this._setLabelRequired();
                    return Validators.required;
                } else if (valItem.hasOwnProperty('minLength')) {
                    return Validators.minLength(valItem.minLength);
                } else if (valItem.hasOwnProperty('maxLength')) {
                    return Validators.maxLength(valItem.maxLength);
                } else if (valItem.hasOwnProperty('email')) {
                    return Validators.email;
                } else if (valItem.hasOwnProperty('pattern')) {
                    return Validators.pattern(valItem.pattern);
                }

            });
        } else {
            return null;
        }
    }

    /**
     * additions to the label if there is a synchronous validation required
     * @private
     */
    private _setLabelRequired(): void {
        if (this.label) {
            this.label = `${this.label} *`;
        }
    }
}
