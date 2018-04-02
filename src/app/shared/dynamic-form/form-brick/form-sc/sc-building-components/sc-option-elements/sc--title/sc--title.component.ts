import { Component, Input } from '@angular/core';
import { RegisterComponent } from '../../../../../../components-list-map.meta';

@Component({
    selector: 'bo-form-sc--title',
    templateUrl: './sc--title.component.html',
    styleUrls: ['./sc--title.component.scss']
})

@RegisterComponent('form-sc__title')

export class FormScTitleComponent {

    @Input() data;

}
