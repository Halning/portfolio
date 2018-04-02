import { BehBase } from './beh-base.model';
import { BoFormGroup } from '../../component-models';

export class BehEnable extends BehBase {

    /**
     * toggle disabledView of element
     * @param value
     */
    private set replaceState(value) {
        // if (this.controlIns.disabledView !== value) {
        //     this.controlIns.disabledView = value;
        // }
        // if parent group is disabledView set current control disabled
        if ((<BoFormGroup>this.controlIns.parent).disabledView) {
            this.controlIns.disabledView = (<BoFormGroup>this.controlIns.parent).disabledView;
        } else if (this.controlIns.disabledView !== value) {
            this.controlIns.disabledView = value;
        }

        // if current control is Group and has controls
        if (this.controlIns instanceof BoFormGroup && this.controlIns.controlsArray
            && this.controlIns.controlsArray.length) {
            this._disableAllNestedControlsOfGroup(this.controlIns.controlsArray);
        }
    }

    constructor(options: {} = {}) {
        super(options);
        this.mainBehLogic = this._mainBehLogic;
        this.mainBehLogic();
        this.subscribeToLLControls();
    }

    /**
     * main logic to enable behavior
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
        this.replaceState = !this.checkCon(allValStat, this.conditionsRule);
    }

    /**
     * recursive disable or enable all BoFormControls in group and nested groups
     * @param controls
     * @private
     */
    private _disableAllNestedControlsOfGroup(controls): void {
        controls.forEach((control) => {
            if (control instanceof BoFormGroup && control.controlsArray && control.controlsArray.length) {
                this._disableAllNestedControlsOfGroup(control.controlsArray);
            } else { // if BoFormControls
                // if we need to enable control and his have behaviors
                if (!this.controlIns.disabledView && control.behaviors && control.behaviors.length) {
                    // get 'enable' behavior
                    const enableBeh = control.behaviors.filter(beh => {
                        return beh.type === 'enable';
                    });

                    // if BoFormControls have 'enable' behavior, check his dependency,
                    // because the parent can be enable and the control itself has other dependencies
                    // that do not enable him
                    if (enableBeh.length) {
                        enableBeh[0].behSrv._runDependencyCheck();
                    } else { // set parent disabledView
                        control.disabledView = this.controlIns.disabledView;
                    }
                } else { // set parent disabledView
                    control.disabledView = this.controlIns.disabledView;
                }
            }
        });
    }
}
