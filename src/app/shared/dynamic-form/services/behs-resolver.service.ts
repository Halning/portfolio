import { Injectable, Injector } from '@angular/core';

import { FormBaseType } from '../component-models/form-base.type';
import { behTypeArray } from './beh-models/beh-base.model';

import { BoFormGroup } from '../component-models';
import { BehDisplay } from './beh-models/beh-display.model';
import { BehEnable } from './beh-models/beh-enable.model';
import { BehReset } from './beh-models/beh-reset.model';
import { BehPatchValue } from './beh-models/beh-patch-value.model';
import { BehDisableOptions } from './beh-models/beh-disable-options.model';
import { BehAddLazyLoadingControls } from './beh-models/beh-add-ll-controls.model';
import { BehRemoveControls } from './beh-models/beh-remove-controls.model';

import * as e from '../exceptions/behavior-exceptions/behavior-exceptions.mixin';

export interface BRMixin extends e.IBM, e.EmptyClass, e.Constructable<BRMixin> {
}

@Injectable()
export class BehsResolverService extends (<BRMixin>e.EBM(e.EmptyClass)) {

    constructor(private injector: Injector) {
        super();
    }

    initBehaviors(controlIns: BoFormGroup): void {
        const controls = controlIns.controlsArray;

        if (controls && controls.length) {
            controls.forEach(control => {
                this._setDisabledViewByParent(control);

                if (control.controlsArray && control.controlsArray.length) {
                    this.initBehaviors(control);
                } else {
                    this._createBehaviors(control);
                }
            });
        }

        this._createBehaviors(controlIns as FormBaseType);
    }


    destroyBehaviors(controlIns: FormBaseType): void {
        const controls = controlIns.controlsArray;

        if (controls && controls.length) {
            controls.forEach(control => {
                if (control.controlsArray && control.controlsArray.length) {
                    this.destroyBehaviors(control);
                } else {
                    this._behUnsubscribe(control);
                }
            });
        }

        this._behUnsubscribe(controlIns);
    }

    /**
     * create behavior depend his 'type' - property from form-config
     * @param {FormBaseType} controlIns
     * @private
     */
    private _createBehaviors(controlIns: FormBaseType): void {
        if (controlIns.behaviors) {
            controlIns.behaviors = controlIns.behaviors.map(b => {
                b.controlIns = controlIns;

                // check if 'behaviorType' one of exist behaviors
                const behaviorType = this.getProperty(b, 'behaviorType', 'literalString', true,
                    behTypeArray);

                switch (behaviorType) {
                    case 'display':
                        return new BehDisplay(b);
                    case 'enable':
                        return new BehEnable(b);
                    case 'reset':
                        if (this.canBehWorkWithControl(b)) {
                            return new BehReset(b);
                        }
                        return null;
                    case 'patchValue':
                        if (this.canBehWorkWithControl(b)) {
                            return new BehPatchValue(b);
                        }
                        return null;
                    case 'disableOptions':
                        if (this.canBehWorkWithControl(b)) {
                            return new BehDisableOptions(b);
                        }
                        return null;
                    case 'addLLControls':
                        b.injector = this.injector;
                        b.brs = this;
                        return new BehAddLazyLoadingControls(b);
                    case 'removeControl':
                        b.brs = this;
                        return new BehRemoveControls(b);
                    default:
                        return null;
                }
            });
        }
    }

    /**
     * unsubscribe for all subscriptions on behavior
     * if we do not do this, there will be a memory leak
     * @param {FormBaseType} controlIns
     * @private
     */
    private _behUnsubscribe(controlIns: FormBaseType): void {
        if (controlIns.behaviors && controlIns.behaviors.length) {
            controlIns.behaviors.forEach(beh => {
                // console.log(beh);
                if (beh.combinedSub) {
                    beh.combinedSub.unsubscribe();
                }
                if (beh.llControlSub) {
                    beh.llControlSub.unsubscribe();
                }
            });
        }
    }

    private _setDisabledViewByParent(controlIns: FormBaseType): void {
        const parentConIns = controlIns.parent as BoFormGroup;

        if (parentConIns && parentConIns.disabledView) {
            controlIns.disabledView = true;
        }
    }
}
