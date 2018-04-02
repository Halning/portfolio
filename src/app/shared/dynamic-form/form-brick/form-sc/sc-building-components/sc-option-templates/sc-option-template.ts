import {
    ComponentFactoryResolver, ComponentRef, Injector, Input, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';


import { IScOption, IScViewConfig } from '../../../../component-models';
import { COMPONENT_LIST_DATA } from '../../../../../components-list-map.meta';


export class ScOptionTemplate implements OnInit {

    @Input() private data: IScOption;
    @Input() private viewConfig: IScViewConfig;
    @ViewChild('TemplatePoint1', {read: ViewContainerRef}) private TemplatePoint1: ViewContainerRef;
    @ViewChild('TemplatePoint2', {read: ViewContainerRef}) private TemplatePoint2: ViewContainerRef;

    private resolver: ComponentFactoryResolver;

    constructor(private injector: Injector) {
        this.resolver = injector.get(ComponentFactoryResolver);
    }

    ngOnInit() {
        this.createComponentsInTemplate();
    }

    private createComponentsInTemplate(): void {
        for (const templatePointKey in this.viewConfig.placing) {
            if (this.viewConfig.placing.hasOwnProperty(templatePointKey)) {
                if (!this.hasOwnProperty(templatePointKey)) {
                    return;
                }
                const pointComponentsIds: string[] = this.viewConfig.placing[templatePointKey];
                pointComponentsIds.forEach((componentId: string) => {
                    let componentName;
                    for (const configComponentItem of this.viewConfig.components) {
                        if (configComponentItem.id === componentId) {
                            componentName = configComponentItem.name;
                            break;
                        }
                    }
                    const componentData = this.data.viewData[componentId];
                    if (!componentData) {
                        return;
                    }
                    const itemComponent = COMPONENT_LIST_DATA.getComponent(componentName);
                    if (!itemComponent) {
                        return;
                    }
                    const componentFactory = this.resolver.resolveComponentFactory(itemComponent);
                    const componentRef: ComponentRef<any> = this[templatePointKey].createComponent(componentFactory);
                    componentRef.instance.data = componentData;
                });
            }
        }
    }

}
