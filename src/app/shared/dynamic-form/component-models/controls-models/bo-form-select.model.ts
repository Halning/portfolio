import { BoFormControl } from '../bo-form-control.model';
import { IAnyObj } from '../form-base.type';

export interface IBoFormSelectOption {
    key: string;
    value: string;
    icon?: string;
    label?: string;
    disabled?: boolean;
}

export class BoFormSelect extends BoFormControl<string> {
    options: IBoFormSelectOption[] = [];

    constructor(options: IAnyObj = {}) {
        super(options);
        // check value type
        this.getProperty(options, 'value', 'string|number', true);

        // check options type
        this.options = this.getProperty(options, 'options', 'array', true);
        this._checkOptionsPropertyTypes();

        this._autoSelectOptionWhenSingle();
    }

    private _checkOptionsPropertyTypes(): void {
        if (this.options && this.options.length) {
            this.options = this.options.map(opt => {
                return {
                    key: this.getProperty(opt, 'key', 'string', true),
                    value: this.getProperty(opt, 'value', 'string|number', true),
                    icon: this.getProperty(opt, 'icon', 'string') || '',
                    label: this.getProperty(opt, 'label', 'string') || '',
                    disabled: this.getProperty(opt, 'disabled', 'boolean') || false
                };
            });
        }
    }

    private _autoSelectOptionWhenSingle(): void {
        if (this.options && this.options.length === 1) {
            this.value = this.options[0].value;
        }
    }
}
