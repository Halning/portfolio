import { BoFormCounter, ICounterParams } from './bo-form-counter.model';

export interface ICounterPriceParams extends ICounterParams {
    currency: string;
}

export class BoFormCounterPrice extends BoFormCounter {
    params: ICounterPriceParams;

    constructor(options: {} = {}) {
        super(options);
        this.params.currency = this.getProperty(options['params'], 'currency', 'string') || 'USD';
    }
}
