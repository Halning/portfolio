import { IAnyObj } from '../../component-models/form-base.type';
import * as e from '../../exceptions/behavior-exceptions/behavior-exceptions.mixin';

export interface ACGMixin extends e.IBM, Object, e.Constructable<ACGMixin> {
}

export class ConGroup extends (<ACGMixin>e.EBM(e.EmptyClass)) {
    conditionType: 'conGroup';
    conditionsMatchingRule: 'any' | 'all';
    conditions: IAnyObj[];
    /* no config property */
    parentKey: string;

    constructor(options: {
        parentKey?: string,
        conditionType?: 'conGroup',
        conditionsMatchingRule?: 'any' | 'all',
        conditions?: IAnyObj[]
    } = {}) {
        super();
        this.parentKey = options.parentKey;
        this.conditionType = this.getProperty(options, 'conditionType',
            'literalString', false, ['conGroup']) || 'conGroup';
        this.conditionsMatchingRule = this.getProperty(options, 'conditionsMatchingRule',
            'literalString', false, ['all', 'any']) || 'any';
        this.conditions = this._sortAnyAllConditions(options.conditions);
    }

    /**
     * Conditions 'any' must go first conditions 'all' second
     * @param {IAnyObj[]} conditions
     * @returns {IAnyObj[]}
     * @private
     */
    private _sortAnyAllConditions(conditions: IAnyObj[]): IAnyObj[] {
        return conditions.sort((a, b) => {
            let nameA = a.conditionsMatchingRule || 'any';
            let nameB = b.conditionsMatchingRule || 'any';
            nameA = nameA.toUpperCase();
            nameB = nameB.toUpperCase();
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }

            return 0;
        });
    }
}
