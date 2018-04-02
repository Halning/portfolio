import { NgModule } from '@angular/core';

import { WindowRefService } from './window-ref.service';
import { ApiRequestService } from './request/api-request.service';

const SERVICES = [
    ApiRequestService,
    WindowRefService
];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [SERVICES],
})
export class CoreModule {
}

