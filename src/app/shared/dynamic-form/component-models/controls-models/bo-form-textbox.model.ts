import { BoFormControl } from '../bo-form-control.model';
import { IAnyObj } from '../form-base.type';

export class BoFormTextbox extends BoFormControl<string> {
    constructor(options: IAnyObj = {}) {
        super(options);
        // check value type
        this.getProperty(options, 'value', 'string|number', true);
    }
}
