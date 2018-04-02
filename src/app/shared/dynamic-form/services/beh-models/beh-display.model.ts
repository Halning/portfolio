import { BehBase } from './beh-base.model';

export class BehDisplay extends BehBase {

    /**
     * toggle hidden of element and enable or disable him
     * @param value
     */
    private set replaceState(value) {
        if (this.controlIns.hidden !== value) {
            this.controlIns.hidden = value;
            if (this.controlIns.hidden) {
                this.controlIns.disable();
            } else {
                this.controlIns.enable();
            }
        }
    }

    constructor(options: {} = {}) {
        super(options);
        this.mainBehLogic = this._mainBehLogic;
        this.mainBehLogic();
        this.subscribeToLLControls();
    }

    /**
     * main logic to display behavior
     * @private
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
        // console.log(allValStat);
        this.replaceState = !this.checkCon(allValStat, this.conditionsRule);
    }
}
