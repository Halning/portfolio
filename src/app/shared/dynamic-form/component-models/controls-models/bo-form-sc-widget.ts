import { BoFormSC } from './bo-form-sc.model';
import { IAnyObj } from '../form-base.type';

export class BoFormScWidget extends BoFormSC {
    readonly labelIcon: string;

    constructor(options: IAnyObj = {}) {
        super(options);
        this.labelIcon = this.getProperty(options, 'labelIcon', 'string') || '';
    }
}
