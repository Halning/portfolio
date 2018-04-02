import { FormGroup } from '@angular/forms';

import * as m from './bo-form-mixin.model';
import * as e from '../exceptions/controls-exceptions/control-exceptions.mixin';
import { FormBaseType, IAnyObj, IControlsObjType } from './form-base.type';
import { IBoFormGroup } from './interfaces/bo-form-group.interface';

export interface FGMixin extends m.IM1, e.IEM, m.IM2, FormGroup, m.Constructable<FGMixin> {
}

export type ControlTypeGroup = 'form-root' | 'form-group' | 'form-group-separate';

export const groupTypeArray = ['form-root', 'form-group', 'form-group-separate'];

export class BoFormGroup extends (<FGMixin>m.M2(m.M1(e.EM(FormGroup)))) implements IBoFormGroup {
    readonly key: string;
    readonly controlType: ControlTypeGroup;
    label: string;
    readonly order: number;
    behaviors: IAnyObj[] | null;
    readonly grid: string;
    disabledView: boolean;
    nestedBody: boolean;
    hidden: boolean;
    /* not config property */
    controlsArray: Array<FormBaseType> | null;
    nonExistingDependControls: string[] = [];

    constructor(options: {
        key?: string,
        controlType?: ControlTypeGroup,
        label?: string,
        controls?: {
            [key: string]: FormBaseType;
        },
        order?: number,
        behaviors?: IAnyObj[] | null,
        grid?: string;
        disabledView?: boolean;
        nestedBody?: boolean;
        hidden?: boolean;
    } = {}) {
        super(options.controls);
        this.key = this.getProperty(options, 'key', 'string', true);
        this.controlType = this.getProperty(options, 'controlType', 'literalString', true, groupTypeArray);
        this.label = this.getProperty(options, 'label', 'string') || '';

        const order = this.getProperty(options, 'order', 'number');
        this.order = order === undefined ? 1 : order;
        this.behaviors = this.getProperty(options, 'behaviors', 'array') || null;
        this.grid = this.getProperty(options, 'grid', 'string') || 'col-12';
        this.disabledView = this.getProperty(options, 'disabledView', 'boolean') || false;
        this.nestedBody = this.getProperty(options, 'nestedBody', 'boolean') || false;
        this.hidden = this.getProperty(options, 'hidden', 'boolean') || false;

        this.controlsArray = Object.values(this.getProperty(options, 'controls', 'object', true));
    }

    sortControls(controls): IControlsObjType {
        this.controlsArray = null;

        const controlsArray = Object.entries(controls)
            .sort((a: any, b: any) => a[1].order - b[1].order)
            .map(item => {
                return item[1];
            });

        const sortGroup = {};

        controlsArray.forEach((item: any) => {
            sortGroup[item.key] = item;
        });

        return sortGroup;
    }
}
