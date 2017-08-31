import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { WindowRefService } from './window-ref.service';
import { HaApiRequest } from './request/HaApiRequest';

const SERVICES = [
    HaApiRequest,
    WindowRefService,
];

@NgModule({
    imports: [
        HttpModule
    ],
    exports: [],
    declarations: [],
    providers: [SERVICES],
})
export class CoreModule {
}

