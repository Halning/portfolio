// import { Component, ElementRef, OnInit } from '@angular/core';
// import {
//     BoBaseDropdown
// } from '../../../../../../shared/atomary-components/popups-modals/dropdown/dropdown.base.component';
// import * as moment from 'moment';
//
//
// @Component({
//     selector: 'bo-dp-dropdown-form',
//     templateUrl: './form-dp-dropdown.component.html',
//     styleUrls: ['./form-dp-dropdown.component.scss']
// })
//
// export class FormDPDropdownComponent extends BoBaseDropdown implements OnInit {
//
//     data;
//
//     flags = {
//         isCalendarOpen: true,
//         isHoursOpen: false
//     };
//
//     calendarConfig = {
//         min: moment(),
//         dayBtnCssClassCallback: (m => {
//
//             const calendarDate = moment(m).set('hour', 0).set('minute', 0).set('second', 0).toString();
//             const chooseDate = moment(this.data.selectedDate).set('hour', 0).set('minute', 0).set('second', 0).toString();
//
//             if (calendarDate === chooseDate) {
//                 return 'dp-selected';
//             }
//         })
//     };
//
//     constructor(el: ElementRef) {
//         super(el);
//     }
//
//     ngOnInit() {
//         super.ngOnInit();
//     }
//
//     onSelectTimeClick(): void {
//         this._checkHoursOnDaySelect();
//         this.flags.isCalendarOpen = false;
//         this.flags.isHoursOpen = true;
//     }
//
//     onDaySelect(e): void {
//         if (!e.date || !this.data.selectedDate) {
//             return;
//         }
//         this.data.selectedDate = e.date;
//         this.flags.isCalendarOpen = false;
//         this.flags.isHoursOpen = true;
//         this._checkHoursOnDaySelect();
//         this.change.emit({
//             date: this.data.selectedDate
//         });
//     }
//
//     onHourSelect(hour): void {
//         this.data.hours.forEach(hourItem => {
//             hourItem.active = false;
//         });
//         hour.active = true;
//         this.close.emit({date: this.data.selectedDate});
//     }
//
//     private _checkHoursOnDaySelect(): void {
//         const selectedDay = new Date(this.data.selectedDate.toString()).toDateString();
//         const currentDay = new Date().toDateString();
//         if (selectedDay !== currentDay) {
//             this.data.hours.forEach(hour => {
//                 hour.disabled = false;
//             });
//             return;
//         }
//         const currentHours = new Date().getHours();
//         this.data.hours.forEach(hour => {
//             hour.disabled = (hour.in24 <= currentHours);
//         });
//     }
// }
