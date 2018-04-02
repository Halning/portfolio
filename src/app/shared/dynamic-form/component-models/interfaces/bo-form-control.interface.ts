import { IBoFormBase } from './bo-form-base.interface';
import { IAnyObj } from '../form-base.type';

/**
 * Glossary
 * `Control` - {@link BoFormControl}
 * `ContGroup` - {@link BoFormControl} or {@link BoFormGroup}
 *
 * This is the additional interface for `Control` and all who inherit from it as
 * {@link BoFormCheckbox} etc.
 *
 * It defines the properties that are shared between all `Control`, like `value`, `validation`.
 *
 */
export interface IBoFormControl<T> extends IBoFormBase {
    /**
     *  required property of config
     *  if the `value` does not come empty it will be the default value
     *
     *  Example
     *
     * ```typescript
     * value: '100 g.'
     * ```
     */
    value: T;
    /**
     * property of config
     *
     * Synchronous validation array
     * You can use validation from listed Validators or custom
     *
     * Example
     * ```typescript
     *  validation: [{required: null}, {max: 2}]
     *  ```
     *
     * @default `null`
     */
    readonly validation: IAnyObj[] | null;
    /**
     * property of config
     *
     * `true` - `value` of `Control` will send in body of form
     * `false` - `value` of `Control` will not send in body of form
     *
     * @default `true`
     */
    readonly sendValue: boolean;
}
