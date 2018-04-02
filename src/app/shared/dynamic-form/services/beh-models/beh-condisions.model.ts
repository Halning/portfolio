import { FormBaseType, IAnyObj } from '../../component-models/form-base.type';
import * as e from '../../exceptions/behavior-exceptions/behavior-exceptions.mixin';

import { ConGroup } from '../con-models/con-group.model';
import { ConValueMatchDo } from '../con-models/con-value-match-do.model';
import { ConValuePresence } from '../con-models/con-value-presence.model';
import { AbstractCon, conditionTypeArray } from '../con-models/abstract-con.model';
import { ConValueMatch } from '../con-models/con-value-match.model';
import { ConStatusMatch } from '../con-models/con-status-match.model';
import { BehaviorType } from './beh-base.model';

export interface BCMixin extends e.IBM, e.EmptyClass, e.Constructable<BCMixin> {
}

export class BehConditions extends (<BCMixin>e.EBM(e.EmptyClass)) {
    /**
     * required property of config
     */
    behaviorType: BehaviorType;
    /**
     * required property of config
     */
    conditions: IAnyObj[];

    /* not config properties */
    /**
     * all control keys on which the behavior depends
     */
    fieldKeys: string[] = [];
    /**
     * the control to which this behavior relates
     */
    controlIns: FormBaseType;
    /**
     * all control keys on which the behavior depends by value
     */
    valueChangeFieldKeys: string[] = [];
    /**
     * all control keys on which the behavior depends by status
     */
    statusChangeFieldKeys: string[] = [];
    conditionsRule?: ConGroup;

    constructor(options: {
        behaviorType?: BehaviorType,
        conditions?: IAnyObj[],
        controlIns?: FormBaseType,
    } = {}) {
        super();
        this.controlIns = options.controlIns;
        this.conditions = this.getProperty(options, 'conditions', 'array', true);
        this.behaviorType = options.behaviorType;

        this._createConditionUnionObj();
    }

    // init conditions

    /**
     * create the root object of all conditions
     * @private
     */
    private _createConditionUnionObj(): void {
        this.conditionsRule = this._createConGroup(this.conditions, {
            conditionsMatchingRule: 'any',
            conditions: this.conditions
        });
    }

    private _createConGroup(conditions, conGroup): ConGroup {
        const group = [];

        conditions.forEach(con => {
            // if condition group
            if (con.conditionType === 'conGroup') {
                group.push(this._createConGroup(
                    this.getProperty(con, 'conditions', 'array', true), con));
            } else {
                group.push(this._generateConditionsRules(con));
            }
        });

        return new ConGroup({
            parentKey: this.controlIns.key,
            conditionType: conGroup.conditionType,
            conditionsMatchingRule: conGroup.conditionsMatchingRule,
            conditions: group
        });
    }

    /**
     * get the condition depending on the conditionType
     * @param condition
     * @returns {AbstractCon}
     * @private
     */
    private _generateConditionsRules(condition): AbstractCon {
        const fieldKey = Array.isArray(condition.fieldKey)
            ? condition.fieldKey.join('.') : condition.fieldKey;

        this.fieldKeys = this.unique(this.fieldKeys.concat(fieldKey));

        const conditionType = this.getProperty(condition, 'conditionType',
            'literalString', true, conditionTypeArray);

        switch (conditionType) {
            case 'valueMatch':
                this.valueChangeFieldKeys = this.unique(this.valueChangeFieldKeys.concat(fieldKey));

                return new ConValueMatch({
                    parentKey: this.controlIns.key,
                    conditionType: condition.conditionType,
                    fieldKey: fieldKey,
                    conditionsMatchingRule: condition.conditionsMatchingRule,
                    matchingValues: condition.matchingValues
                });
            case 'valuePresence':
                this.valueChangeFieldKeys = this.unique(this.valueChangeFieldKeys.concat(fieldKey));

                return new ConValuePresence({
                    parentKey: this.controlIns.key,
                    conditionType: condition.conditionType,
                    fieldKey: fieldKey,
                    conditionsMatchingRule: condition.conditionsMatchingRule
                });
            case 'valueMatchDO':
                this.valueChangeFieldKeys = this.unique(this.valueChangeFieldKeys.concat(fieldKey));

                return new ConValueMatchDo({
                    parentKey: this.controlIns.key,
                    conditionType: condition.conditionType,
                    fieldKey: fieldKey,
                    conditionsMatchingRule: condition.conditionsMatchingRule,
                    disabledOptions: condition.disabledOptions
                });
            case 'statusMatch':
                this.statusChangeFieldKeys = this.unique(this.statusChangeFieldKeys.concat(fieldKey));

                return new ConStatusMatch({
                    parentKey: this.controlIns.key,
                    conditionType: condition.conditionType,
                    fieldKey: fieldKey,
                    conditionsMatchingRule: condition.conditionsMatchingRule,
                    matchingStatus: condition.matchingStatus
                });
        }
    }

    /**
     * unique Array values
     * @param {Array<any>} arr
     * @returns {string[]}
     */
    protected unique(arr: Array<any>): string[] {
        const obj = {};

        for (let i = 0; i < arr.length; i++) {
            const str = arr[i];
            obj[str] = true;
        }

        return Object.keys(obj);
    }

}
