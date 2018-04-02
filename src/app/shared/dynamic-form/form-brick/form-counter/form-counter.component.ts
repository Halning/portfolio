import {
    Component, forwardRef, HostListener, Input, OnInit,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { BoFormCounter, ICounterParams } from '../../component-models/';


export const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormCounterComponent),
    multi: true,
};

@Component({
    selector: 'bo-form-counter',
    templateUrl: 'form-counter.component.html',
    styleUrls: ['form-counter.component.scss'],
    providers: [VALUE_ACCESSOR]
})

export class FormCounterComponent implements OnInit, ControlValueAccessor {
    @Input() controlIns: BoFormCounter;

    @ViewChild('counterInput') counterInput;

    onChange;
    onTouched;

    /**
     * focus on counter-input element
     */
    elementFocus = false;

    set curValue(value: number) {
        this.currentValue = value;

        // patch value only when we have normal number
        if ((value && !value.toString().endsWith('.') && !value.toString().endsWith(',')) || !value) {
            this.counterValueStream.next(this.currentValue);
        }
    }

    /**
     * set elementFocus property
     * @param {boolean} value
     */
    set focusInput(value: boolean) {
        if (this.elementFocus !== value) {
            if (value) { // if focus = 'true' set focus on counter-input element
                setTimeout(() => {
                    this.counterInput.nativeElement.focus();
                    this._setEndOfContenteditable();
                });
                // if focus = 'false' check if exist params.min on counter and if curVal < params.min
                // set curVal to params.min
            } else if (this.params.min && this.currentValue < this.params.min) {
                // if we have min param and current input value < min set currentValue to params.min
                this.curValue = this.params.min;
                this._innerCurDisplayVal(); // set to html
            }

            this.elementFocus = value;
        }
    }

    /**
     * utility property for calculating a value of control
     */
    private currentValue: number;
    /**
     * set controlIns.value to currentValue by stream
     */
    private counterValueStream = new Subject<number>();
    private delay = 300;

    protected params: ICounterParams;

    @HostListener('wheel', ['$event'])
    onScroll(e): void {
        e.preventDefault();
        if (e.deltaY > 0) {
            this.onCountDown();
        } else {
            this.onCountUp();
        }
    }

    constructor() {
    }

    ngOnInit() {
        // console.log(this.controlIns);
        this.params = this.controlIns.params;
        this._initCounterValueStream();
    }

    // ControlValueAccessor methods

    writeValue(value: string): void {
        // set current value direct for not make control 'dirty' make dirty only when this.onChange called
        this.currentValue = +value;
        this._innerCurDisplayVal();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // user ui methods
    /**
     * when value input by keyboard
     * @param e
     */
    onInputValue(e): void {
        this.validateInputValue(e);
        this._innerCurDisplayVal();
        this._setEndOfContenteditable();
    }

    /**
     * when value input by 'wheel' - event or by 'click' to btns
     */
    onCountUp(): void {
        this.focusInput = true;

        let newDisplayVal = +(+this.currentValue + this.params.step)
            .toFixed(this.params.maxSymbolsAfterDot);
        newDisplayVal = (this.params.max && newDisplayVal >= this.params.max)
            ? this.params.max : newDisplayVal;
        this.currentValue = newDisplayVal;
        this.updateInputValue();
    }

    /**
     * when value input by 'wheel' - event or by 'click' to btns
     */
    onCountDown(): void {
        this.focusInput = true;

        let newDisplayVal = +(this.currentValue - this.params.step)
            .toFixed(this.params.maxSymbolsAfterDot);
        newDisplayVal = (newDisplayVal >= this.params.min)
            ? newDisplayVal : this.params.min;
        this.currentValue = newDisplayVal;
        this.updateInputValue();
    }

    // private

    /**
     * check value by params.min and params.max and update currentValue
     */
    private updateInputValue(): void {
        let outValue = this.currentValue;
        outValue = (this.params.max && outValue > this.params.max)
            ? this.params.max : outValue;
        outValue = (this.params.min && outValue < this.params.min)
            ? this.params.min : outValue;
        this.curValue = outValue;
        // show now
        this._innerCurDisplayVal();
    }

    /**
     * validation value input by keyboard from counter-input element
     * @param e
     */
    private validateInputValue(e): void {
        let currentVal = e.target.textContent.trim();

        // only for number
        if (isNaN(currentVal)) {
            currentVal = currentVal.slice(0, -1);
        }

        if (currentVal.startsWith('.')) {
            currentVal = this.currentValue.toString();
        }

        // if we have max and equal max value and value endsWith dot or value > max value
        if (this.params.max && ((+currentVal === this.params.max && currentVal.endsWith('.'))
                || (currentVal > this.params.max))) {
            currentVal = currentVal.slice(0, -1);
            return;
        }

        // if two dots in the end of value or if we count whole numbers
        if (currentVal.endsWith('..') || (currentVal.endsWith('.') && !this.params.maxSymbolsAfterDot)) {
            currentVal = currentVal.slice(0, -1);
            return;
        }

        // check count of decimal
        if (this.params.maxSymbolsAfterDot && currentVal.split('.')[1] &&
            this.params.maxSymbolsAfterDot < currentVal.split('.')[1].length) {
            return;
        }

        this.curValue = currentVal;
    }

    private _setEndOfContenteditable(): void {
        let range, selection;
        if (document.createRange) {
            range = document.createRange();
            range.selectNodeContents(this.counterInput.nativeElement);
            range.collapse(false);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    /**
     * display current value on counter-input element
     * @private
     */
    private _innerCurDisplayVal(): void {
        if (this.counterInput && this.counterInput.nativeElement) {
            this.counterInput.nativeElement.textContent = this.currentValue.toString();
        }
    }

    /**
     * set currentValue to controlIns.value across 'delay' and if they are not equal
     * @private
     */
    private _initCounterValueStream(): void {
        this.counterValueStream
            .debounceTime(this.delay)
            .distinctUntilChanged()
            .subscribe(() => {
                this.onChange(this.currentValue.toString());
            });
    }
}
