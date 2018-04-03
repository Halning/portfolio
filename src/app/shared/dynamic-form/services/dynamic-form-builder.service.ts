import { Injectable } from '@angular/core';

import { IAnyObj, IControlsObjType } from '../component-models/form-base.type';

import { BoFormGroup, BoFormControl, groupTypeArray, controlTypeArray } from '../component-models/';
import { BoFormRoot } from '../component-models/group-models/';
import {
    BoFormCounter, BoFormCounterPrice, BoFormCheckbox,
    BoFormSC, BoFormScWidget, BoFormSelect,
    BoFormRadio, BoFormTextbox
} from '../component-models/controls-models/';
import { BoFormDatepicker } from '../component-models/controls-models/bo-form-datepicker.model';

export interface EmMixin extends e.IEM, e.EmptyClass, e.Constructable<EmMixin> {
}

import * as e from '../exceptions/controls-exceptions/control-exceptions.mixin';

@Injectable()
export class DynamicFormBuilderService extends (<EmMixin>e.EM(e.EmptyClass)) {

    constructor() {
        super();
    }

    /**
     * create main form - BoFormRoot
     * @param {IAnyObj} formConfig
     * @returns {BoFormRoot}
     */
    createForm(formConfig: IAnyObj): BoFormRoot {
        formConfig['controlType'] = 'form-root';
        formConfig['controls'] = this.createGroup(this.getControls(formConfig), formConfig);
        formConfig['controls'] = this._sortControls(formConfig['controls']);
        return new BoFormRoot(formConfig);
    }

    /**
     * create a configuration form
     * @param {IAnyObj} controls
     * @param {IAnyObj} curGroup
     * @returns {object}
     */
    createGroup(controls: IAnyObj, curGroup: IAnyObj): object | BoFormGroup {
        const group = {};

        controls.forEach(control => {
            // if control is 'group'
            if (groupTypeArray.indexOf(control.controlType) !== -1) {
                group[control.key] = this.createGroup(this.getControls(control), control);
            } else {
                group[control.key] = this.createControl(control);
            }
        });

        // for root form return controls
        if (curGroup['controlType'] === 'form-root') {
            return group;
        } else {
            curGroup['controls'] = this._sortControls(group);
            return new BoFormGroup(curGroup);
        }
    }

    /**
     * create control depend his 'controlType' - property from form-config
     * @param {IAnyObj} control
     * @returns {BoFormControl<any>}
     */
    createControl(control: IAnyObj): BoFormControl<any> | null {
        // check `controlType`
        const controlType = this.getProperty(control, 'controlType', 'literalString', true,
            controlTypeArray.concat(groupTypeArray));

        switch (controlType) {
            case 'sc':
                return new BoFormSC(control);
            case 'sc-widget':
                return new BoFormScWidget(control);
            case 'textbox':
                return new BoFormTextbox(control);
            case 'radio':
            case 'radio-big':
            case 'radio-center':
                return new BoFormRadio(control);
            case 'select':
                return new BoFormSelect(control);
            case 'counter':
                return new BoFormCounter(control);
            case 'counter-price':
                return new BoFormCounterPrice(control);
            case 'checkbox':
                return new BoFormCheckbox(control);
            case 'datePicker':
                return new BoFormDatepicker(control);
            default:
                return null;
        }
    }

    /**
     * create a configuration of lazy loading controls
     *
     * @param {IAnyObj} control
     * @returns {object | BoFormGroup | BoFormControl<any>}
     */
    createGroupOrControlLazyLoading(control: IAnyObj): object | BoFormGroup | BoFormControl<any> {
        // if int's FormGroup
        if (groupTypeArray.indexOf(control.controlType) !== -1) {
            return this.createGroup(this.getControls(control), control);
        } else { // if FormControl
            return this.createControl(control);
        }
    }

    /**
     * sort controls by 'order' property from config
     * @param {IControlsObjType} controls
     * @returns {IControlsObjType}
     * @private
     */
    private _sortControls(controls: IControlsObjType): IControlsObjType {
        const controlsArray = Object.entries(controls).sort((a, b) => a[1].order - b[1].order).map(item => {
            return item[1];
        });

        const sortGroup = {};

        controlsArray.forEach(item => {
            sortGroup[item.key] = item;
        });

        return sortGroup;
    }
}
