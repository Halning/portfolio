import { BoFormGroup, BoFormRoot } from '../../component-models';
import { BehBase } from './beh-base.model';

import { BehsResolverService } from '../behs-resolver.service';

export class BehRemoveControls extends BehBase {

    private _brs: BehsResolverService;

    /**
     * reset element if state true
     * @param value
     */
    private set replaceState(value) {
        // console.log(value);
        if (value && this.controlIns.parent.get(this.controlIns.key)) {
            console.log('remove', this.controlIns.key);
            const parentControl = (<BoFormGroup>this.controlIns.parent);

            // if we not unsubscribe subscriptions on valueChanges or statusChanges will increment
            this._brs.destroyBehaviors(this.controlIns);

            (<BoFormRoot>this.controlIns.root).removeControlDefaultValue(this.controlIns);
            parentControl.removeControl(this.controlIns.key);

            // sort lazy loaded control by 'order'
            parentControl.controlsArray = Object.values(parentControl.sortControls(parentControl.controls));
            // (<BoFormRoot>this.controlIns.root).shareRemoveControls();
        }
    }

    constructor(options: {} = {}) {
        super(options);
        this._brs = options['brs'];
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
        // console.log(allValStat);
        this.replaceState = this.checkCon(allValStat, this.conditionsRule);
    }
}
