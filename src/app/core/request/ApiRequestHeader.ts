import { Headers } from '@angular/http';

import { IRequestHeader } from './IRequestHeader';

export class ApiRequestHeader implements IRequestHeader {


    constructor() {
    }

    createHeaders(): Headers {
        const header = new Headers();

        header.append('Content-Type', 'application/json');

        return header;
    }

}
