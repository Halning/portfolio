import {
    ApplicationRef, Component, ComponentFactoryResolver,
    ComponentRef, ElementRef, EmbeddedViewRef, forwardRef, Injector,
    Input, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BoFormSelect, IBoFormSelectOption } from '../../component-models/';

import { FormSelectOptionsComponent } from './form-select-option/form-select-options.component';

export const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormSelectComponent),
    multi: true,
};

@Component({
    selector: 'bo-form-select',
    templateUrl: './form-select.component.html',
    styleUrls: ['./form-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class FormSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() controlIns: BoFormSelect;
    @ViewChild('selectRef') selectRef: ElementRef;

    onTouched;
    onChange;
    selected: IBoFormSelectOption;

    private optionsComponent = FormSelectOptionsComponent;
    private optionsComponentRef: ComponentRef<FormSelectOptionsComponent>;

    constructor(private resolver: ComponentFactoryResolver,
                private appRef: ApplicationRef, private injector: Injector) {
    }

    ngOnInit() {
        // console.log(this.controlIns);
    }

    ngOnDestroy() {
        // destroy search when keypress 'esc'
        if (this.optionsComponentRef) {
            this.optionsComponentRef.destroy();
        }
    }

    writeValue(selected: string): void {
        this._setSelected();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    select(selectMatch: IBoFormSelectOption): void {
        this.onChange(selectMatch.value);
        this._setSelected();
    }

    openSearchSection(): void {
        if (this.optionsComponent) {
            this._appendOptionsToBody();
        }
    }

    private _setSelected() {
        this.selected = this.controlIns.options.filter(i => {
            return i.value === this.controlIns.value;
        })[0];
    }

    private _appendOptionsToBody(): void {
        this.optionsComponentRef =
            this.resolver.resolveComponentFactory<FormSelectOptionsComponent>(this.optionsComponent)
                .create(this.injector);
        this.appRef.attachView(this.optionsComponentRef.hostView);
        const domElem = (this.optionsComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.optionsComponentRef.instance.options = this.controlIns.options;
        this.optionsComponentRef.instance.parentSelect = this.selectRef;
        this.optionsComponentRef.instance.label = this.controlIns.label;
        this.optionsComponentRef.instance.close
            .subscribe(selectedItem => {
                this.appRef.detachView(this.optionsComponentRef.hostView);
                this.optionsComponentRef.destroy();
                if (!selectedItem) {
                    return;
                }
                this.select(selectedItem);
            });
    }
}
