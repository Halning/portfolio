import { BoFormControl } from '../bo-form-control.model';
import { IAnyObj } from '../form-base.type';

export interface ICounterParams {
    step: number;
    min: number;
    max: number;
    maxSymbolsAfterDot: number;
}

export class BoFormCounter extends BoFormControl<string> {
    params: ICounterParams;

    constructor(options: IAnyObj = {}) {
        super(options);
        // check value type
        this.getProperty(options, 'value', 'string|number', true);
        // check params type
        this.getProperty(options, 'params', 'object', true);

        this.params = {
            step: this.getProperty(options['params'], 'step', 'number', true) || 1,
            min: this.getProperty(options['params'], 'min', 'number') || 0,
            max: this.getProperty(options['params'], 'max', 'number') || 0,
            maxSymbolsAfterDot: 0
        };

        /**
         * if value not exist set value min of counter if not exist min set empty
         */
        this.value = this.value || (this.params.min ? this.params.min.toString() : '');
        this.params.maxSymbolsAfterDot = this._setMaxSymbolsAfterDot();
    }

    /**
     * We check how many characters after the point in a given number by its step
     *
     * @returns {number}
     */
    private _setMaxSymbolsAfterDot(): number {
        const afterDotText = this.params.step.toString().split('.')[1];
        return afterDotText ? afterDotText.length : 0;
    }
}
