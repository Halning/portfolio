import { BoFormControl } from '../bo-form-control.model';
import { IAnyObj } from '../form-base.type';

export class BoFormCheckbox extends BoFormControl<boolean> {
    constructor(options: IAnyObj = {}) {
        super(options);
        // check value type
        this.getProperty(options, 'value', 'boolean', true);
    }
}
