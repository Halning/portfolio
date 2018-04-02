import {
   Component, forwardRef, Injector, OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FormScComponent } from '../form-sc-base/form-sc.component';

export const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormScWidgetComponent),
    multi: true,
};

@Component({
    selector: 'bo-form-sc-widget',
    templateUrl: './form-sc-widget.component.html',
    styleUrls: ['../form-sc-base/form-sc.component.scss', './form-sc-widget.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class FormScWidgetComponent extends FormScComponent implements OnInit, ControlValueAccessor {

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    onDeleteClick(): void {
        this.writeValue('');
    }
}
