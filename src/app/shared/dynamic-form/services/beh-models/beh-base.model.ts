import { EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ConGroup } from '../con-models/con-group.model';
import { BehConditions } from './beh-condisions.model';


export type BehaviorType =
    'addLLControls'
    | 'disableOptions'
    | 'display'
    | 'enable'
    | 'patchValue'
    | 'removeControl'
    | 'reset';

export const behTypeArray = ['addLLControls', 'disableOptions', 'display', 'enable', 'patchValue', 'removeControl', 'reset'];

export class BehBase extends BehConditions {
    /**
     * subscription to all status changes and the values of controls on which this behavior depends
     */
    combinedSub: Subscription;
    /**
     * stream of all status changes and the values of controls on which this behavior depends
     */
    combinedObs: Observable<any>;
    /**
     * subscription to Lazy Loading controls
     */
    llControlSub: Subscription;
    /**
     * basic function for initiating behavior
     */
    mainBehLogic: Function;

    constructor(options: {} = {}) {
        super(options);
    }

    /* `valueChanges` and `statusChanges` observers logic */

    /**
     * get observers from `valueChanges` and `statusChanges` (prop-s from AbstractControl)
     *
     * @param {string} fKey
     * @returns {{scObs: Observable<any>; vcObs: Observable<any>}}
     */
    protected initValueChangeAndStatusChangeObs(fKey: string): { scObs: Observable<any>, vcObs: Observable<any> } {
        let vcObs = Observable.of();
        let scObs = Observable.of();

        const controlIns = this.controlIns.root.get(fKey);

        this._addToNonExistingDependControls(!!controlIns, fKey);

        // subscribe on valueChanges of controls on which this control depends
        if (this.valueChangeFieldKeys
            && this.valueChangeFieldKeys.indexOf(fKey) !== -1 && controlIns) {

            vcObs = controlIns.valueChanges;
        }

        // subscribe on statusChanges of controls on which this control depends
        if (this.statusChangeFieldKeys
            && this.statusChangeFieldKeys.indexOf(fKey) !== -1 && controlIns) {

            scObs = controlIns.statusChanges;
        }

        return {vcObs: vcObs, scObs: scObs};
    }

    /**
     * merge all the observers into one stream
     */
    protected getAndMergeAllEventEmitters(): void {
        this.fieldKeys.forEach(fKey => {
            const obs = this.initValueChangeAndStatusChangeObs(fKey);

            if (obs.vcObs instanceof EventEmitter) {
                if (!this.combinedObs) {
                    this.combinedObs = Observable.merge(obs.vcObs);
                } else {
                    this.combinedObs = this.combinedObs.merge(obs.vcObs);
                }
            }

            if (obs.scObs instanceof EventEmitter) {
                if (!this.combinedObs) {
                    this.combinedObs = Observable.merge(obs.scObs);
                } else {
                    this.combinedObs = this.combinedObs.merge(obs.scObs);
                }
            }
        });
    }

    /**
     * get current all values and statuses of fields on which this field depends by fieldKeys
     *
     * @returns {{[p: string]: Map<string, any>}}
     */
    protected getAllDependFieldsValuesAndStatuses(): { [key: string]: Map<string, any> } {
        const allStat = new Map();
        const allVal = new Map();

        for (const cKey of this.fieldKeys) {
            const controlIns = this.controlIns.root.get(cKey);

            if (this.statusChangeFieldKeys && this.statusChangeFieldKeys.indexOf(cKey) !== -1 && controlIns) {
                allStat.set(cKey, this.controlIns.getStatusFromRoot(cKey));
            }

            if (this.valueChangeFieldKeys && this.valueChangeFieldKeys.indexOf(cKey) !== -1 && controlIns) {
                allVal.set(cKey, this.controlIns.getValueFromRoot(cKey));
            }
        }

        return {s: allStat, v: allVal};
    }

    /*  logic to work with conditions */

    /**
     * main logic to check conditions
     *
     * @param allValStat
     * @param conRules
     * @returns {boolean}
     */
    protected checkCon(allValStat, conRules): boolean {
        let state = false;

        for (const con of conRules.conditions) {
            // if current condition is `ConGroup` and his is valid
            if (con instanceof ConGroup && con.conditions && con.conditions.length) {
                const checkGr = this.checkCon(allValStat, con);

                if (con.conditionsMatchingRule === 'any') {
                    state = checkGr;
                    // console.log(`conG any - ${state}`);

                    if (state) {
                        return state;
                    }
                } else {
                    // console.log(`conG all - ${checkGr}`);

                    if (!checkGr) {
                        return checkGr;
                    } else {
                        state = checkGr;
                    }
                }

            } else {
                const checkCon = con.action({
                    values: allValStat
                });

                if (con.conditionsMatchingRule === 'any') {
                    state = checkCon;
                    // console.log(`con any(${con.fieldKey}) - ${state}`);

                    if (checkCon) {
                        return checkCon;
                    }
                } else {
                    // console.log(`con all(${con.fieldKey}) - ${checkCon}`);

                    if (!checkCon) {
                        return checkCon;
                    } else {
                        state = checkCon;
                    }
                }
            }
        }

        return state;
    }

    /*  logic to work with Lazy Loading Controls */

    /**
     * subscribe to the download of controls if the current control depends on the control that has not yet loaded
     */
    protected subscribeToLLControls(): void {
        const llObs = this.controlIns.subToLazyLoadingControls();

        if (llObs) {
            this.llControlSub = llObs
                .subscribe((llControlsKeys) => {
                    if (this.checkDependControlWasLoaded(llControlsKeys)) {
                        if (this.combinedSub) {
                            this.combinedSub.unsubscribe();
                        }
                        this.combinedObs = null;
                        //  update the subscriptions
                        this.mainBehLogic();
                    }
                });
        }
    }

    /**
     * if the control was loaded and we were waiting for it to update the subscriptions
     * to the controls on which the current
     * `true` -  update the subscriptions
     *
     * @param {string[]} llControlsKeys
     * @returns {boolean}
     */
    protected checkDependControlWasLoaded(llControlsKeys: string[]): boolean {
        const reInit = [];

        llControlsKeys.forEach(llKey => {
            this.controlIns.nonExistingDependControls.forEach(cKey => {
                if (llKey === cKey) {
                    reInit.push(llKey);
                }
            });
        });

        // console.log(reInit);

        return !!reInit.length;
    }

    /**
     * if the control on which the current depends is not loaded yet, we add it to the
     * array - `nonExistingDependControls`
     *
     * @param {boolean} controlInsExist
     * @param {string} fKey
     * @private
     */
    private _addToNonExistingDependControls(controlInsExist: boolean, fKey: string): void {
        if (!controlInsExist) {
            const keyArr = fKey.split('.');
            this.controlIns.nonExistingDependControls.push(keyArr[keyArr.length - 1]);
            this.controlIns.nonExistingDependControls = this.unique(this.controlIns.nonExistingDependControls);
        }
    }
}
