import { IBoFormGroup } from '../interfaces/bo-form-group.interface';
import { FormApiRequestService } from '../../services/form-api-request.service';

/**
 * Glossary:
 * `Group-Root` - {@link BoFormRoot}
 *
 * This is the additional interface for `Group-Root`.
 *
 * It defines the properties of `Group-Root` like `actionUrl`.
 */

export interface IBoFormRoot extends IBoFormGroup {
    /**
     * property of config
     *
     * currently used for styles of `Group-Root` component.
     * It is used only for the root group and defines the styles of all the internal elements of the form
     *
     * 1) `widget` - show form like widget style
     *
     * 2) `page` - show form like page style
     *
     * Example
     * ```typescript
     * formType: `widget`
     * ```
     *
     * @default `page`
     */
    readonly formType: 'widget' | 'page';
    /**
     * URL on which the body of the form will be sent
     * {@link FormApiRequestService}
     *
     * Example
     * ```typescript
     * actionUrl: `api/some-url`
     * ```
     *
     * @default `''` - `Save` btn not show
     */
    readonly actionUrl: string;
}
