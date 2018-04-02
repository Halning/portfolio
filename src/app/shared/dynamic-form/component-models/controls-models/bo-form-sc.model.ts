import { BoFormControl } from '../bo-form-control.model';
import { IAnyObj } from '../form-base.type';

export interface IScViewConfig {
    placing: {
        [key: string]: string[]
    };
    components: {
        name: string;
        id: string;
    }[];
    templateName?: string;
}

export interface IScOption {
    id: string;
    url?: string; // only for product sc because separate urls from product on api
    viewData: {
        [key: string]: object
    };
    active?: boolean;
}

export class BoFormSC extends BoFormControl<string> {
    readonly searchUrl: string;
    readonly selectedConfig: IScViewConfig;
    readonly optionColConfig: IScViewConfig;
    selectedOption: IScOption | null;
    /* not config property */
    required: boolean;
    readonly defaultSelectedOption: IScOption | null;

    // TODO закончить проверку свойств конфига
    constructor(options: IAnyObj = {}) {
        super(options);
        // check value type
        this.getProperty(options, 'value', 'string|number', true);

        this.searchUrl = this.getProperty(options, 'searchUrl', 'string', true);

        // check params type
        this.getProperty(options, 'selectedConfig', 'object', true);
        this.selectedConfig = {
            placing: this.getProperty(options['selectedConfig'], 'placing', 'object', true),
            components: this.getProperty(options['selectedConfig'], 'components', 'array', true),
            templateName: this.getProperty(options['selectedConfig'], 'templateName', 'string')
            || 'form-sc-temp-default'

        };

        this.getProperty(options, 'optionColConfig', 'object', true);
        this.optionColConfig = {
            placing: this.getProperty(options['optionColConfig'], 'placing', 'object', true),
            components: this.getProperty(options['optionColConfig'], 'components', 'array', true),
            templateName: this.getProperty(options['optionColConfig'], 'templateName', 'string')
            || 'form-sc-temp-default'

        };
        // set selected option by default
        this.selectedOption = this.getProperty(options, 'selectedOption', 'object') || null;
        // save default selectedOption on defaultSelectedOption because selectedOption can be reset
        this.defaultSelectedOption = this.selectedOption; // optional

        this.required = this.label && this.label.includes('*');
    }
}
