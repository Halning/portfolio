import { BoFormGroup, FGMixin } from './bo-form-group.model';
import { BoFormControl, FCMixin } from './bo-form-control.model';

/**
 * unification of all properties and methods of classes {@link BoFormGroup} and {@link BoFormControl}
 *
 * Use for better typing
 */
export type FormBaseType = BoFormGroup & BoFormControl<any>;

export interface IControlsObjType {
    [key: string]: FormBaseType;
}

export interface IAnyObj {
    [key: string]: any;
}
