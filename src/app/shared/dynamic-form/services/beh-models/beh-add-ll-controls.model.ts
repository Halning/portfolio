import { Observable } from 'rxjs/Observable';
import * as e from '../../exceptions/controls-exceptions/control-exceptions.mixin';

import { BehBase } from './beh-base.model';
import { BoFormGroup, BoFormRoot } from '../../component-models';
import { FormBaseType, IAnyObj } from '../../component-models/form-base.type';

import { DynamicFormBuilderService } from '../dynamic-form-builder.service';
import { FormApiRequestService } from '../form-api-request.service';
import { BehsResolverService } from '../behs-resolver.service';

export interface ILLRequest {
    url: string;
    method: string;
    bodyParams: { [key: string]: string | string[] } | null;
}

interface IDMixin extends e.IEM, e.EmptyClass, e.Constructable<IDMixin> {
}

class InsertLLControls extends (<IDMixin>e.EM(e.EmptyClass)) {
    insertGroup: string;
    insertControls: object[];

    constructor(options: {
        insertGroup?: string,
        insertControls?: object[]
    } = {}) {
        super();
        this.insertGroup = this.getProperty(options, 'insertGroup', 'string') || '';
        this.insertControls = this.getProperty(options, 'insertControls', 'array', true);
    }
}

export class BehAddLazyLoadingControls extends BehBase {
    request: ILLRequest;
    multi: boolean;

    private _llControlsKeys = [];

    private _fars: FormApiRequestService;
    private _dfb: DynamicFormBuilderService;
    private _brs: BehsResolverService;
    private _loadOnce = false;

    /**
     * reset element if state true
     * @param value
     */
    private set replaceState(value) {
        if (value && this.request && this.request.url && !this._loadOnce) {
            this.controlIns.showLoadingOnRoot();

            this._getLLControlsFromApi<any>()
                .subscribe((insertData: any) => {
                    const controlInsArr = [];
                    // console.log(this.request.url);

                    this._insertLLControlsToForm(insertData, controlInsArr);

                    this._llControlsKeys = [];
                    controlInsArr.forEach(k => {
                        // get all keys of controls which was loaded
                        this._getLLControlsKeys(k);
                        // init behaviors of added controls
                        this._brs.initBehaviors(k);
                    });

                    // share LLControlsKeys
                    (<BoFormRoot>this.controlIns.root).shareLZControls(this._llControlsKeys);

                    // call set value method of all Form
                    // this is necessary for all the behavior to work when in the form added
                    // new controls
                    this.controlIns.root.patchValue(this.controlIns.root.value);

                    this._loadOnce = !this.multi;
                    this.controlIns.hideLoadingOnRoot();
                }, error => {
                    (<BoFormRoot>this.controlIns.root).responseError = error;
                    this.controlIns.hideLoadingOnRoot();
                });
        }
    }

    constructor(options: IAnyObj = {}) {
        super(options);
        this.request = this.getProperty(options, 'request', 'object', true);
        this.multi = this.getProperty(options, 'multi', 'boolean') || false;
        this.request = {
            url: this.getProperty(this.request, 'url', 'string', true),
            method: this.getProperty(this.request, 'method', 'literalString', false, ['post', 'get']) || 'get',
            bodyParams: this.getProperty(this.request, 'bodyParams', 'object') || null
        };

        this._dfb = options['injector'].get(DynamicFormBuilderService);
        this._fars = options['injector'].get(FormApiRequestService);
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
                .distinctUntilChanged() // TODO test
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
        this.replaceState = this.checkCon(allValStat, this.conditionsRule);
    }

    /**
     * insert Lazy Loaded controls to form
     * @param {Array<FormBaseType>} controlInsArr - All controls that have been added to the form
     * @private
     */
    private _insertLLControlsToForm(insertData: any, controlInsArr: Array<FormBaseType>): void {

        insertData.forEach(inObj => {
            inObj = new InsertLLControls(inObj);
            // get instance of FormGroup where need to insert
            const insertControl = inObj.insertGroup ?
                (<BoFormGroup>this.controlIns.root.get(inObj.insertGroup))
                : (<BoFormRoot>this.controlIns.root);

            let controlIns = null;

            inObj.insertControls.forEach(control => {
                controlIns = this._dfb.createGroupOrControlLazyLoading(control);

                // if we need to replace control first destroy his behaviors
                if (insertControl.get(control.key)) {
                    this._brs.destroyBehaviors(insertControl.get(control.key) as FormBaseType);
                }

                // replace control if key exist in insertGroup
                insertControl.setControl(control.key, controlIns);

                // insert default value of controls to `formDefaultValue` in BoFormRoot
                (<BoFormRoot>this.controlIns.root).addControlDefaultValue(controlIns);
                controlInsArr.push(controlIns);
            });

            // sort lazy loaded control by 'order'
            insertControl.controlsArray = Object.values(insertControl.sortControls(insertControl.controls));
        });
    }

    /**
     * get LLControls from api
     * @returns {Observable<T>}
     * @private
     */
    private _getLLControlsFromApi<T>(): Observable<T> {
        return this._fars.getLLControls<T>(this.request, this.controlIns);
    }


    private _getLLControlsKeys(controlIns): void {
        const controls = controlIns.controls && Object.values(controlIns.controls);

        if (controls && controls.length) {
            controls.forEach((control: any) => {
                this._llControlsKeys.push(control.key);

                if (control.controls && Object.keys(control.controls)
                    && Object.keys(control.controls).length) {
                    this._getLLControlsKeys(control);
                }
            });
        }

        this._llControlsKeys.push(controlIns.key);
    }
}
