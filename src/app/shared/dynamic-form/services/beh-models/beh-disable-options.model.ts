import { BehBase } from './beh-base.model';
import { ConValueMatchDo } from '../con-models/con-value-match-do.model';

export class BehDisableOptions extends BehBase {

    /**
     * tmp Map object with options
     * @type {Map<string, any>}
     */
    private _tmpOptions = new Map<string, any>();
    /**
     * contain all values which need to disable
     */
    private _disValues: string[];

    constructor(options: {} = {}) {
        super(options);
        this._initNewOptions();
        this.mainBehLogic = this._mainBehLogic;
        this.mainBehLogic();
        this.subscribeToLLControls();
    }

    /**
     * main logic
     */
    private _mainBehLogic(): void {
        this.getAndMergeAllEventEmitters();
        this._subscribeOnCombinedObs();
    }

    private _subscribeOnCombinedObs(): void {
        // subscribe to all form-elements on which this element depends
        if (this.combinedObs) {
            this.combinedSub = this.combinedObs
                .subscribe((value) => {
                    // console.log(value);
                    // if statusChanges subscribe getAllDependFieldsValuesAndStatuses when statusChanges on root
                    if (value === 'VALID' || value === 'INVALID') {
                        const subRoot = this.controlIns.root.statusChanges.subscribe(() => {
                            subRoot.unsubscribe();
                            this._runDependencyCheck();
                        });
                    } else {
                        // if valueChanges getAllDependFieldsValuesAndStatuses when valueChanges on root
                        // because root.value change last
                        const subRoot = this.controlIns.root.valueChanges.subscribe(() => {
                            subRoot.unsubscribe();
                            this._runDependencyCheck();
                        });
                    }
                });
        }
    }

    private _runDependencyCheck(): void {
        this._disValues = [];

        const allValStat = this.getAllDependFieldsValuesAndStatuses();

        this._getNeedToDisableOptions(allValStat, this.conditionsRule);
        // console.log(this.disValues);
        this._disableOptionsAndResetValue();

        // copy tmpOptions on options of controlIns to show in view
        this.controlIns['options'].forEach((h, i) => {
            this.controlIns['options'][i] = this._tmpOptions.get(h.value);
        });
    }

    private _getNeedToDisableOptions(allValStat, conRules): void {
        let allDisValues = [];

        for (const con of conRules.conditions) {
            if (con instanceof ConValueMatchDo) {
                const checkCon = con.action({
                    values: allValStat
                });

                if (checkCon) {
                    if (con.conditionsMatchingRule === 'any') {
                        this._disValues = this._disValues.concat(checkCon);
                        this._disValues = this.unique(this._disValues);
                    } else {
                        allDisValues = allDisValues.concat(checkCon);
                    }
                }
            }
        }

        // if we have options to disable from conditions with conditionsMatchingRule = 'all'
        if (allDisValues.length) {
            allDisValues = this._getAllConDisValues(conRules.conditions, allDisValues);
            // concat and unique 'all' and 'any' options to disable
            this._disValues = this.unique(this._disValues.concat(allDisValues));
        }
    }

    /**
     * create tmpOptions Map object according to Api response options
     */
    private _initNewOptions(): void {
        this.controlIns['options'].forEach(j => {
            this._tmpOptions.set(j.value, Object.assign({}, j));
        });
    }

    /**
     * generate array with options to need disable by allDisValues array
     * @param conditions
     * @param {string[]} allDisValues - array with disValues from all conditions with 'all' - rule
     * @returns {string[]}
     * @private
     */
    private _getAllConDisValues(conditions, allDisValues: string[]): string[] {
        // get count of all conditions
        const allConLength = conditions.filter(n => {
            return n.conditionsMatchingRule === 'all';
        }).length;

        if (allConLength) {
            return this._resolveAllCondRule(allConLength, allDisValues);
        }
    }

    /**
     * set disValues-array only with values which occur as many times as the conditions with
     * conditionsMatchingRule = 'all'
     * @param {number} allConLength - count of all conditions
     * @param {string[]} allDisValues - array with disValues from all conditions with 'all' - rule
     * @returns {string[]}
     * @private
     */
    private _resolveAllCondRule(allConLength: number, allDisValues: string[]): string[] {
        const newDisValues = [];

        allDisValues.forEach(d => {
            const valueIndexes = allDisValues.reduce((a, e, i) => {
                if (e === d) {
                    a.push(i);
                }
                return a;
            }, []);


            if (valueIndexes.length === allConLength) {
                newDisValues.push(allDisValues[valueIndexes[0]]);
            }
        });
        return this.unique(newDisValues);
    }

    /**
     * disable options and reset value if need by disValue array
     * on tmpOptions
     * @private
     */
    private _disableOptionsAndResetValue(): void {
        // if we need to disable some options, first enable all options
        if (this._disValues.length) {
            this._enableAllOptions();

            this._disValues.forEach(d => {
                this._tmpOptions.get(d).disabled = true;
                if (this.controlIns.value === d) {
                    // reset value if we disable selected option
                    this.controlIns.setValue('');
                }
            });
        } else { // if we haven't disable options enable all options
            this._enableAllOptions();
        }
    }

    /**
     * temporary enable all options
     * @private
     */
    private _enableAllOptions(): void {
        this._tmpOptions.forEach(opt => {
            opt['disabled'] = null;
        });
    }
}
