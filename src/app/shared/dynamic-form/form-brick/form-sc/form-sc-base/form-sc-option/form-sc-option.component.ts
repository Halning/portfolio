import {
    Component, ComponentFactoryResolver, ComponentRef, Injector, Input, OnChanges, OnInit, ViewChild,
    ViewContainerRef
} from '@angular/core';

import { IScOption, IScViewConfig } from '../../../../component-models';
import { COMPONENT_LIST_DATA } from '../../../../../components-list-map.meta';

@Component({
    selector: 'bo-form-sc-option',
    templateUrl: './form-sc-option.component.html',
    styleUrls: ['./form-sc-option.component.scss']
})

export class FormScOptionComponent implements OnInit, OnChanges {

    @Input() private option: IScOption;
    @Input() private viewConfig: IScViewConfig;
    @ViewChild('templateContainer', {read: ViewContainerRef}) private templateContainer: ViewContainerRef;

    private resolver: ComponentFactoryResolver;
    private componentRef: ComponentRef<any>;

    constructor(private injector: Injector) {
        this.resolver = injector.get(ComponentFactoryResolver);
    }

    ngOnInit() {
        this._appendDynamicTemplate();
    }

    ngOnChanges(changes) {
        if (changes.option && this.componentRef) {
            this.componentRef.destroy();
            this._appendDynamicTemplate();
        }
    }

    private _appendDynamicTemplate(): void {
        const itemComponent = COMPONENT_LIST_DATA.getComponent(this.viewConfig.templateName);
        if (!itemComponent) {
            return;
        }
        const componentFactory = this.resolver.resolveComponentFactory(itemComponent);
        this.componentRef = this.templateContainer.createComponent(componentFactory);
        this.componentRef.instance.data = this.option;
        this.componentRef.instance.viewConfig = this.viewConfig;
    }
}
