import { IBoFormBase } from './bo-form-base.interface';
import { FormBaseType } from '../form-base.type';

import { FormDynamicComponent } from '../../form-base/form-dynamic.component';

/**
 * Glossary:
 * `Group` - {@link BoFormGroup}
 * `ContGroup` - {@link BoFormControl} or {@link BoFormGroup}
 *
 * This is the additional interface for `Group` and all who inherit from it as
 * {@link BoFormRoot} etc.
 *
 * It defines the properties that are shared between all `Group`, like `controlType`, `controlsArray`.
 */

export interface IBoFormGroup extends IBoFormBase {
    /**
     * property of config
     *
     * currently used for styles of `Group`components and make `Group` instances
     *
     * 1) `form-root` {@link BoFormRoot} - set only on root `Group`
     *
     * 2) `form-group` {@link BoFormGroup} and add css class `form-group`
     *
     * 3) `form-group-separate` {@link BoFormGroup} and add class `form-group-separate`
     *
     * Example
     * ```typescript
     * controlType: `form-group-separate`
     * ```
     *
     * @default `form-group`
     */
    readonly controlType: 'form-root' | 'form-group' | 'form-group-separate';
    /**
     * An array with references to instances of children `ContGroup` of this `Group`,
     * sorted by the `order` property of these `ContGroup`. Used for sorted output in a form template
     * {@link FormDynamicComponent}
     */
    controlsArray: Array<FormBaseType>;
    /**
     * if you want the `value` in the form submission `body` to contain the nesting of the `Group`
     *
     * Example
     * ```typescript
     *  if (nestedBody) {
     *      let requestBody = {
     *          keyOfThisGroup: {
     *              keyOfControl1: 'valueOfControl1',
     *              keyOfControl2: 'valueOfControl2'
     *          }
     *      }
     *  }
     *
     *  if (nestedBody) {
     *      let requestBody = {
     *          keyOfControl1: 'valueOfControl1',
     *          keyOfControl2: 'valueOfControl2'
     *      }
     *  }
     * ```
     *
     * @default `false`
     */
    nestedBody: boolean;
}
