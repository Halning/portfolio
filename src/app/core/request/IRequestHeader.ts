import { Headers } from '@angular/http';

export interface IRequestHeader {
    createHeaders(): Headers;
}
