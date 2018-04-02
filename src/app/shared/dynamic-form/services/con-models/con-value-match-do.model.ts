import { AbstractCon } from './abstract-con.model';
import { IAnyObj } from '../../component-models/form-base.type';

export class ConValueMatchDo extends AbstractCon {
    disabledOptions: { [key: string]: string[] };

    constructor(options: IAnyObj = {}) {
        super(options);
        this.disabledOptions = this.getProperty(options, 'disabledOptions', 'object', true);
    }

    /**
     * return need to disable options of radio control
     * @param opt
     * @returns {string[]}
     */
    action(opt): string[] {
        if (this.disabledOptions.hasOwnProperty(opt.values.v.get(this.fieldKey))) {
            return this.disabledOptions[opt.values.v.get(this.fieldKey)];
        }
    }
}
