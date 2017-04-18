import { NgModule } from '@angular/core';

import { WindowRefService } from './window-ref.service';
import { HaApiRequest } from './request/HaApiRequest';

const SERVICES = [
    HaApiRequest,
    WindowRefService,
];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [SERVICES],
})
export class CoreModule {
}

