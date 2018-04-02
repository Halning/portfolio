// import {
//     Component, ElementRef,
//     forwardRef, Input, OnDestroy,
//     ViewChild,
// } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import * as moment from 'moment';
//
// import { BoFormDatepicker } from '../../component-models/controls-models/bo-form-datepicker.model';
// import { DropdownClient } from '../../../../atomary-components/popups-modals/dropdown/dropdown-client';
//
// import { FormDPDropdownComponent } from './form-dp-dropdown/form-dp-dropdown.component';
//
// import { BoDropDownService } from '../../../../atomary-components/popups-modals/dropdown/dropdown.service';
//
//
// export const VALUE_ACCESSOR: any = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => FormDatePickerComponent),
//     multi: true,
// };
//
// @Component({
//     selector: 'bo-form-date-picker',
//     templateUrl: './form-date-picker.component.html',
//     styleUrls: ['./form-date-picker.component.scss'],
//     providers: [VALUE_ACCESSOR]
// })
// export class FormDatePickerComponent implements OnDestroy, ControlValueAccessor {
//     @Input() controlIns: BoFormDatepicker;
//     @ViewChild('dropDownParent') dropDownParent: ElementRef;
//
//     onChange;
//     onTouched;
//
//     hours = [
//         {in24: 1, val: '1:00 am', disabled: false, active: false},
//         {in24: 2, val: '2:00 am', disabled: false, active: false},
//         {in24: 3, val: '3:00 am', disabled: false, active: false},
//         {in24: 4, val: '4:00 am', disabled: false, active: false},
//         {in24: 5, val: '5:00 am', disabled: false, active: false},
//         {in24: 6, val: '6:00 am', disabled: false, active: false},
//         {in24: 7, val: '7:00 am', disabled: false, active: false},
//         {in24: 8, val: '8:00 am', disabled: false, active: false},
//         {in24: 9, val: '9:00 am', disabled: false, active: false},
//         {in24: 10, val: '10:00 am', disabled: false, active: false},
//         {in24: 11, val: '11:00 am', disabled: false, active: false},
//         {in24: 12, val: '12:00 am', disabled: false, active: false},
//         {in24: 13, val: '1:00 pm', disabled: false, active: false},
//         {in24: 14, val: '2:00 pm', disabled: false, active: false},
//         {in24: 15, val: '3:00 pm', disabled: false, active: false},
//         {in24: 16, val: '4:00 pm', disabled: false, active: false},
//         {in24: 17, val: '5:00 pm', disabled: false, active: false},
//         {in24: 18, val: '6:00 pm', disabled: false, active: false},
//         {in24: 19, val: '7:00 pm', disabled: false, active: false},
//         {in24: 20, val: '8:00 pm', disabled: false, active: false},
//         {in24: 21, val: '9:00 pm', disabled: false, active: false},
//         {in24: 22, val: '10:00 pm', disabled: false, active: false},
//         {in24: 23, val: '11:00 pm', disabled: false, active: false},
//         {in24: 24, val: '12:00 pm', disabled: false, active: false},
//     ];
//
//     selectedHour: any;
//     selectedDate: any;
//
//     isOpenDropdown = false;
//
//     private _dropDown: DropdownClient;
//
//     constructor(private _dropDownSrv: BoDropDownService) {
//     }
//
//     ngOnDestroy() {
//         // destroy dropDown when keypress 'esc'
//         if (this._dropDown) {
//             this._dropDown.remove();
//         }
//     }
//
//     // ControlValueAccessor methods
//
//     writeValue(value: string): void {
//         // console.log(this.controlIns);
//         if (value !== this.controlIns.value) {
//             this.onChange(value);
//         }
//
//         this.selectedDate = this.controlIns.value || null;
//     }
//
//     registerOnChange(fn: any): void {
//         this.onChange = fn;
//     }
//
//     registerOnTouched(fn: any): void {
//         this.onTouched = fn;
//     }
//
//     onDeleteClick(): void {
//         this.writeValue('');
//     }
//
//     openDropdown(): void {
//         this.isOpenDropdown = true;
//         const m = moment();
//         const newDate = moment(this.controlIns.value || new Date().toISOString());
//         m.set(newDate.toObject());
//
//         this._dropDown = this._dropDownSrv
//             .create(FormDPDropdownComponent, this.dropDownParent, {
//                 selectedDate: m,
//                 parentConfig: this.controlIns,
//                 hours: this.hours
//             });
//
//         this._dropDown.afterChanges()
//             .subscribe(e => {
//                 if (!e) {
//                     return;
//                 }
//                 this._updateSelectedHour();
//                 const updatedDate = this.selectedHour ?
//                     e.date
//                         .set('hour', this.selectedHour.in24)
//                         .set('minute', 0)
//                         .set('second', 0)
//                     : e.date;
//                 this.writeValue(updatedDate.toString());
//             });
//
//         this._dropDown.afterClosed()
//             .subscribe(e => {
//                 this.isOpenDropdown = false;
//                 if (!e) {
//                     return;
//                 }
//                 this._updateSelectedHour();
//                 const updatedDate = e.date
//                     .set('hour', this.selectedHour.in24)
//                     .set('minute', 0)
//                     .set('second', 0);
//                 this.writeValue(updatedDate.toString());
//
//             });
//     }
//
//     private _updateSelectedHour(): void {
//         this.hours.forEach(hour => {
//             if (hour.active) {
//                 this.selectedHour = hour;
//             }
//         });
//     }
// }
