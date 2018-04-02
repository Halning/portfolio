import {
    ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EmbeddedViewRef,
    forwardRef, Injector, Input, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BoFormSC, IScOption } from '../../../component-models/';

import { FormScSearchComponent } from './form-sc-search/form-sc-search.component';

export const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormScComponent),
    multi: true,
};

@Component({
    selector: 'bo-form-sc',
    templateUrl: './form-sc.component.html',
    styleUrls: ['./form-sc.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class FormScComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() controlIns: BoFormSC;
    @ViewChild('rootScRef') private rootScRef: ElementRef;

    onTouched;
    onChange;

    private searchComponent = FormScSearchComponent;
    private searchComponentRef: ComponentRef<FormScSearchComponent>;

    /* DI services */

    private resolver: ComponentFactoryResolver;
    private appRef: ApplicationRef;

    constructor(private injector: Injector) {
        this.resolver = injector.get(ComponentFactoryResolver);
        this.appRef = injector.get(ApplicationRef);
    }

    ngOnInit() {
        // console.log(this.controlIns);
    }

    ngOnDestroy() {
        // destroy search when keypress 'esc'
        if (this.searchComponentRef) {
            this.searchComponentRef.destroy();
        }
    }

    writeValue(value: string): void {
        // when 'revert' form or init sc with default value
        if (value && this.controlIns.defaultSelectedOption && value === this.controlIns.defaultSelectedOption.id) {
            this.controlIns.selectedOption = this.controlIns.defaultSelectedOption;
        }

        // for make controlIns 'dirty'
        if (value !== this.controlIns.value) {
            this.onChange(value);
        }

        // set 'null' selectedOptions when value empty
        if (!value && this.controlIns.selectedOption) {
            this.controlIns.selectedOption = null;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    appendSearchToBody(): void {
        this.searchComponentRef =
            this.resolver.resolveComponentFactory<FormScSearchComponent>(this.searchComponent)
                .create(this.injector);
        this.appRef.attachView(this.searchComponentRef.hostView);
        const domElem = (this.searchComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.searchComponentRef.instance.rootScRef = this.rootScRef;
        this.searchComponentRef.instance.optionColConfig = this.controlIns.optionColConfig;
        this.searchComponentRef.instance.searchUrl = this.controlIns.searchUrl;
        this.searchComponentRef.instance.close
            .subscribe(selectedOption => {
                this.appRef.detachView(this.searchComponentRef.hostView);
                this.searchComponentRef.destroy();
                if (!selectedOption) {
                    return;
                }
                this._setSelected(selectedOption);
            });
    }

    /**
     * select an option from the drop-down list
     * @param {IScOption} selectedItem
     */
    private _setSelected(selectedItem: IScOption): void {
        this.controlIns.selectedOption = selectedItem;
        this.writeValue(selectedItem.id);
    }
}
