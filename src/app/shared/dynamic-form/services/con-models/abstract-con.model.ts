import * as e from '../../exceptions/behavior-exceptions/behavior-exceptions.mixin';

export interface ACMixin extends e.IBM, e.EmptyClass, e.Constructable<ACMixin> {
}

export type ConditionType = 'valueMatch' | 'valuePresence' | 'valueMatchDO' | 'statusMatch';

export const conditionTypeArray = ['valueMatch', 'valuePresence', 'valueMatchDO', 'statusMatch', 'conGroup'];

export abstract class AbstractCon extends (<ACMixin>e.EBM(e.EmptyClass)) {
    conditionType: ConditionType;
    conditionsMatchingRule: 'any' | 'all';
    fieldKey?: string;
    /* no config property */
    parentKey: string;

    constructor(options: {
        parentKey?: string,
        conditionType?: ConditionType,
        fieldKey?: string,
        conditionsMatchingRule?: 'any' | 'all'
    } = {}) {
        super();
        this.parentKey = options.parentKey;
        this.conditionType = this.getProperty(options, 'conditionType',
            'literalString', true, conditionTypeArray);
        this.fieldKey = this.getProperty(options, 'fieldKey', 'string|array', true);
        this.conditionsMatchingRule = this.getProperty(options, 'conditionsMatchingRule',
            'literalString', false, ['all', 'any']) || 'any';
    }
}
