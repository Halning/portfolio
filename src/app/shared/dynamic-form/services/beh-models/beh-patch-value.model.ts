import { BehBase } from './beh-base.model';
import { IAnyObj } from '../../component-models/form-base.type';

export class BehPatchValue extends BehBase {
    /**
     * property of config
     */
    patchValue: any;

    /**
     * reset element if state true
     * @param value
     */
    private set replaceState(value) {
        if (value && this.controlIns.value !== this.patchValue) {
            this.controlIns.setValue(this.patchValue);
        }
    }

    constructor(options: IAnyObj = {}) {
        super(options);
        this.patchValue =
            this.getProperty(options, 'patchValue', 'string|number|boolean|object', true);
        this.mainBehLogic = this._mainBehLogic;
        this.mainBehLogic();
        this.subscribeToLLControls();
    }

    /**
     * main logic to reset behavior
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
        const allValStat = this.getAllDependFieldsValuesAndStatuses();
        this.replaceState = this.checkCon(allValStat, this.conditionsRule);
    }
}
