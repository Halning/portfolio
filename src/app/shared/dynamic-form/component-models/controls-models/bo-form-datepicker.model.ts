import { BoFormControl } from '../bo-form-control.model';
import { IAnyObj } from '../form-base.type';

export interface IDeliveryTranslates {
    selectTime: string;
    selectDate: string;
}

export class BoFormDatepicker extends BoFormControl<string> {
    translates: IDeliveryTranslates;
    /* not config property */
    required: boolean;

    constructor(options: IAnyObj = {}) {
        super(options);
        // check value type
        this.getProperty(options, 'value', 'string', true);
        this.getProperty(options, 'translates', 'object', true);

        this.translates = {
            selectTime: this.getProperty(options['translates'], 'selectTime', 'string', true),
            selectDate: this.getProperty(options['translates'], 'selectDate', 'string', true),
        };

        this.required = this.label && this.label.includes('*');
    }
}
