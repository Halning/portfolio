import {
    Component, ElementRef, EventEmitter, HostListener, Injector, Input,
    OnInit, Output, ViewChild,
} from '@angular/core';

import { IBoFormSelectOption } from '../../../component-models/';

import { WindowRefService } from '../../../../../core/window-ref.service';


@Component({
    selector: 'bo-form-select-options',
    templateUrl: './form-select-options.component.html',
    styleUrls: ['./form-select-options.component.scss']
})

export class FormSelectOptionsComponent implements OnInit {
    @Input() options: IBoFormSelectOption[];
    @Input() parentSelect: ElementRef;
    @Input() label: string;
    @Output() close = new EventEmitter<IBoFormSelectOption | void>();
    @ViewChild('optionsWr') private optionsWr: ElementRef;
    @ViewChild('optionsListWr') private optionsListWr: ElementRef;
    @ViewChild('dropWr') private dropWr: ElementRef;

    /**
     * determines whether this component should be opened in the bottom or up
     */
    isDownDirection: boolean;

    private windowRefSrv: WindowRefService;
    private props = {
        listWindowMargin: 20,
        listMinHeight: 200
    };

    @HostListener('window:resize', [])
    private onResize(): void {
        this._updateCssProps();
    }

    constructor(private injector: Injector) {
        this.windowRefSrv = injector.get(WindowRefService);
    }

    ngOnInit() {
        // console.log(this.options);
        this._updateCssProps();
    }

    onCloseWrap(): void {
        this.close.emit();
    }

    onSelectOption(selected: IBoFormSelectOption): void {
        this.close.emit(selected);
    }

    private _updateCssProps(): void {
        this._updateWrapCssProps();
        this._updateListCssProps();
        this._updateDropWrCssProps();
    }

    private _updateWrapCssProps(): void {
        const rect = this.parentSelect.nativeElement.getBoundingClientRect();
        const parentSelectWidth = this.windowRefSrv.nativeWindow.getComputedStyle(this.parentSelect.nativeElement).width;
        this.optionsWr.nativeElement.style.left = `${rect.left}px`;
        this.optionsWr.nativeElement.style.top = `${rect.top}px`;
        this.optionsWr.nativeElement.style.width = `${parentSelectWidth}`;
    }

    private _updateListCssProps(): void {
        const windowHeight = this.windowRefSrv.nativeWindow.innerHeight;
        const listStartPosition = this.parentSelect.nativeElement.getBoundingClientRect().top +
            parseFloat(this.windowRefSrv.nativeWindow.getComputedStyle(this.parentSelect.nativeElement).height);

        let listMaxHeight = windowHeight - listStartPosition - this.props.listWindowMargin;
        this.isDownDirection = (listMaxHeight >= this.props.listMinHeight);
        listMaxHeight = (listMaxHeight >= this.props.listMinHeight) ? listMaxHeight : this.props.listMinHeight;
        this.optionsListWr.nativeElement.style.maxHeight = `${listMaxHeight}px`;
    }

    private _updateDropWrCssProps(): void {
        if (this.isDownDirection) {
            this.dropWr.nativeElement.style.top =
                this.windowRefSrv.nativeWindow.getComputedStyle(this.parentSelect.nativeElement).height;
        } else {
            this.dropWr.nativeElement.style.bottom = '0px';
        }
    }
}
