
/**
 *  Glossary:
 * `Control` - {@link BoFormControl}
 * `Group` - {@link BoFormGroup}
 * `ContGroup` - {@link BoFormControl} or {@link BoFormGroup}
 *
 * This is the base interface for `ContGroup`
 *
 * It defines the properties that are shared between all base `ContGroup`, like `order`, `key`, and `label`.
 *
 */
export interface IBoFormBase {
    /**
     * required property of config
     *
     * A unique `key`, the name of control is used for [formControlName] - directive
     *
     * Also, the `key` is used as a property in the body of the request body for the backend
     * ```typescript
     *  let requestBody = {
     *     key: value
     *     key: value
     * }
     * ```
     */
    readonly key: string;
    /**
     * required property of config for controls `Control`
     *
     * and not required for groups `Group` where default value `form-group`
     *
     * The type of control is used to dynamically create a `controlIns` based on type
     *
     * {@link DynamicFormBuilderService.createControl} - for `Control`
     *
     * {@link DynamicFormBuilderService.createForm or createGroup} - for `Group`
     *
     * It is also used to create components based on created controlIns {@link FormDynamicComponent}
     *
     */
    readonly controlType: string;
    /**
     * property of config
     *
     * A label is used for output in a template.
     *
     * Add '*' if the `ContGroup` is required. He has validation - required.
     *
     * @default `''`
     */
    label: string;
    /**
     * property of config
     *
     * used to sort `ContGroup`.
     *
     * The smaller the number, the higher the priority for the `ContGroup` output in the template.
     *
     * If the numbers of the two `ContGroup` are the same, then the first goes that which is higher in the config.
     * for example `{order: 1}` will be displayed higher than `{order: 2}`,
     * if both have `{order: 1}` first goes that which is higher in the config
     *
     * @default `1`
     */
    readonly order: number;
    /**
     * property of config
     *
     * property consisting of array with classes of behaviors
     * {@link BehsResolverService}
     *
     * @default `null`
     */
    behaviors: { [key: string]: any }[] | null;
    /**
     * property of config
     *
     * The grid is the classes of the bootstrap framework. Used to display the grid control
     * for example `col-7`, `col-5`.
     *
     * @default `col-12` - this means the element takes up the entire width
     */
    readonly grid: string;
    /**
     *  property of config
     *
     *  A property that is responsible for disabling a `ContGroup` in the template.
     *  Ie the element itself remains in the form but with it is impossible
     *  to carry out some kind of interaction to the user.
     *
     *  Also change the appearance of this element adding an 'disabled' class to the element in
     *  {@link BehEnableDirective };
     *
     *  This property is modified by behavior `enable` {@link BehEnable}
     *
     *  @default `false`
     */
    disabledView: boolean;
    /**
     * property of config
     *
     * The label indicates whether the `ContGroup`.component is now hidden or displayed,
     * is used for the `display` behavior {@link BehDisplay}
     *
     * @default `false` - it means control now visible
     */
    hidden: boolean;
    /**
     * An array of `ContGroup` path from root on which this `ContGroup` depends, but which have not yet been loaded.
     * They should be loaded lazily, as soon as the `ContGroup` from this array is loaded it is deleted from this array.
     * The property is used for behavior `lazyLoadingControls` {@link BehAddLazyLoadingControls}
     *
     * Example: `['path.to.control', 'path.to.another.control']`
     *
     * @default `[]`
     */
    nonExistingDependControls: string[];
}
