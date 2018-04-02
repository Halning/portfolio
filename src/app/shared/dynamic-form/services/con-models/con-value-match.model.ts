import { AbstractCon } from './abstract-con.model';
import { IAnyObj } from '../../component-models/form-base.type';

export class ConValueMatch extends AbstractCon {
    matchingValues: (string | number | boolean)[];

    constructor(options: IAnyObj = {}) {
        super(options);
        this.matchingValues = this.getProperty(options, 'matchingValues', 'array', true);
    }

    /**
     * check if value of control exist in matchingValues array
     * @param opt
     * @returns {boolean}
     */
    action(opt): boolean {
        return this.matchingValues.indexOf(opt.values.v.get(this.fieldKey)) !== -1;
    }
}
