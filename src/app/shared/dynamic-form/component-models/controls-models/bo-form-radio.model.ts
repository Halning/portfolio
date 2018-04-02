import { BoFormControl } from '../bo-form-control.model';
import { IAnyObj } from '../form-base.type';

export interface IRadioOptions {
    label: string;
    value: string;
    disabled: boolean | null;
}

export class BoFormRadio extends BoFormControl<string> {
    options: IRadioOptions[];
    /* not config property */
    /**
     * styles for outputting radio buttons
     */
    style: 'radio' | 'radio-big' | 'radio-center';

    constructor(options: IAnyObj = {}) {
        super(options);
        // check value type
        this.getProperty(options, 'value', 'string|number', true);
        // check options type
        this.getProperty(options, 'options', 'array', true);

        this.options = options['options'].map(opt => {
            return {
                label: this.getProperty(opt, 'label', 'string', true),
                value: this.getProperty(opt, 'value', 'string|number', true),
                disabled: this.getProperty(opt, 'disabled', 'boolean') || null,
            };
        });

        this.style = options['controlType'];
    }
}
