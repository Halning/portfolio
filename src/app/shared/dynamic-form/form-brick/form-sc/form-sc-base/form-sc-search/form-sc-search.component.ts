import {
    Component, ElementRef, EventEmitter, HostListener, Injector,
    Input, OnInit, Output, Renderer2, ViewChild
} from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

import { IScOption, IScViewConfig } from '../../../../component-models/';

import { FormScService } from '../../form-sc.service';
import { WindowRefService } from '../../../../../../core/window-ref.service';


@Component({
    selector: 'bo-form-sc-search',
    templateUrl: './form-sc-search.component.html',
    styleUrls: ['./form-sc-search.component.scss']
})
export class FormScSearchComponent implements OnInit {

    @Input() rootScRef: ElementRef;
    @Input() optionColConfig: IScViewConfig;
    @Input() searchUrl: string;
    @Output() close = new EventEmitter<IScOption | void>();
    @ViewChild('searchWr') private searchWr: ElementRef;
    @ViewChild('searchInput') private searchInput: ElementRef;
    @ViewChild('searchOptionsWr') private searchOptionsWr: ElementRef;

    responseError: HttpErrorResponse;

    private optionsCol: IScOption[] = [];
    private searchTerm = '';
    private activeOption: IScOption;
    private searchTermStream = new Subject<string>();

    /* services */
    private windowRefSrv: WindowRefService;
    private renderer: Renderer2;
    private scSrv: FormScService;

    /* settings */
    private flags = {
        isSearchProcess: false,
        isDownDirection: true,
    };
    private props = {
        listWindowMargin: 20,
        listMinHeight: 200
    };

    @HostListener('window:resize', [])
    private onResize(): void {
        this.updateCssProps();
    }

    @HostListener('document:keydown', ['$event'])
    private onKeyPress(e): void {
        if (!this.optionsCol || !this.optionsCol.length) {
            return;
        }
        if (e.which === 40) {
            this._activateNextPrevListOption();
        } else if (e.which === 38) {
            this._activateNextPrevListOption('prev');
        } else if (e.which === 13) {
            this.onSelectOption(this.activeOption);
        }
    }

    constructor(private injector: Injector) {
        this.windowRefSrv = injector.get(WindowRefService);
        this.renderer = injector.get(Renderer2);
        this.scSrv = injector.get(FormScService);
    }

    ngOnInit() {
        // console.log(this.optionColConfig);
        this.updateCssProps();
        this.renderer.selectRootElement(this.searchInput.nativeElement).focus();
        this._getOptionsCol();
        this._initSearchTermStream();
    }

    protected onCloseWrap(): void {
        this.close.emit();
    }

    protected onInput(event): void {
        this.searchTermStream.next(event.target.value);
    }

    protected onOptionMouseOver(mouseOverOption: IScOption): void {
        if (this.activeOption) {
            this.activeOption.active = false;
        }
        mouseOverOption.active = true;
        this.activeOption = mouseOverOption;
    }

    protected onSelectOption(option: IScOption): void {
        delete option.active;
        this.close.emit(option);
    }

    /* work with Api */

    private _getOptionsCol(): void {
        this.flags.isSearchProcess = true;
        this.optionsCol = [];
        this.scSrv.getScOptions<IScOption[]>(this.searchUrl, this.searchTerm)
            .subscribe(options => {
                if (options) {
                    this.flags.isSearchProcess = false;
                    this.optionsCol = options;
                }
            }, error => {
                this.flags.isSearchProcess = false;
                this.responseError = error;
            });
    }

    private _initSearchTermStream(): void {
        this.searchTermStream
            .debounceTime(600)
            .distinctUntilChanged()
            .subscribe((term) => {
                this.responseError = null;
                this.searchTerm = term;
                this._getOptionsCol();
            });
    }

    /* set css properties */

    /**
     * set css properties
     */
    private updateCssProps(): void {
        this._updateWrapCssProps();
        this._updateInputCssProps();
        this._updateListCssProps();
    }

    private _updateWrapCssProps(): void {
        const rect = this.rootScRef.nativeElement.getBoundingClientRect();
        const parentSelectWidth = this.windowRefSrv.nativeWindow.getComputedStyle(this.rootScRef.nativeElement).width;
        this.searchWr.nativeElement.style.left = `${rect.left}px`;
        this.searchWr.nativeElement.style.top = `${rect.top}px`;
        this.searchWr.nativeElement.style.width = `${parentSelectWidth}`;
    }

    private _updateInputCssProps(): void {
        this.searchInput.nativeElement.style.height =
            this.windowRefSrv.nativeWindow.getComputedStyle(this.rootScRef.nativeElement).height;
    }

    private _updateListCssProps(): void {
        const windowHeight = this.windowRefSrv.nativeWindow.innerHeight;
        const listStartPosition = this.rootScRef.nativeElement.getBoundingClientRect().top +
            parseFloat(this.windowRefSrv.nativeWindow.getComputedStyle(this.rootScRef.nativeElement).height);

        let listMaxHeight = windowHeight - listStartPosition - this.props.listWindowMargin;
        this.flags.isDownDirection = (listMaxHeight >= this.props.listMinHeight);
        listMaxHeight = (listMaxHeight >= this.props.listMinHeight) ? listMaxHeight : this.props.listMinHeight;
        this.searchOptionsWr.nativeElement.style.maxHeight = `${listMaxHeight}px`;
    }

    /* selected option by keypress */

    private _activateNextPrevListOption(action = 'next'): void {
        let index = this.optionsCol.indexOf(this.activeOption);

        if (this.activeOption) {
            this.activeOption.active = false;
        }

        action === 'next' ? index++ : index--;
        if (index === this.optionsCol.length || index === -1) {
            index = action === 'next' && index === this.optionsCol.length ? 0 : index;
            index = action !== 'next' && index === -1 ? this.optionsCol.length - 1 : index;
        }

        this.optionsCol[index].active = true;
        this.activeOption = this.optionsCol[index];
    }
}
