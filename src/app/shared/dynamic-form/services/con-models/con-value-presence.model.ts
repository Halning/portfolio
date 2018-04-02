import { AbstractCon } from './abstract-con.model';

export class ConValuePresence extends AbstractCon {

    constructor(options: {} = {}) {
        super(options);
    }

    /**
     * check if exist value of control
     * @param opt
     * @returns {boolean}
     */
    action(opt): boolean {
        return !!opt.values.v.get(this.fieldKey);
    }
}
