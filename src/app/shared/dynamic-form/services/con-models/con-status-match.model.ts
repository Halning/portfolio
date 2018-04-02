import { AbstractCon } from './abstract-con.model';
import { IAnyObj } from '../../component-models/form-base.type';

export class ConStatusMatch extends AbstractCon {
    matchingStatus: 'valid' | 'invalid';

    constructor(options: IAnyObj = {}) {
        super(options);
        this.matchingStatus = this.getProperty(options, 'matchingStatus',
            'literalString', true, ['valid', 'invalid']);
    }

    /**
     * check status of control: 'valid' | 'invalid'
     * @param opt
     * @returns {boolean}
     */
    action(opt): boolean {
        return this.matchingStatus === opt.values.s.get(this.fieldKey);
    }
}
